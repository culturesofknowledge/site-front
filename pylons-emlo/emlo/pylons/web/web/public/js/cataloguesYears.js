/**
 * Created by matthew on 05/12/2015.
 */
var timeline = {
	noYear: "no year",
	createChart: function (dataTemp, config) {

		var _dataAll = [],
			_dataFiltered = [],
			_dataNoYear =[],
			catalogues;

		config.scaleMarkers = config.scaleMarkers || 1;

		config.fillColourBase =  config.fillColourBase || "#2E527E";
		config.fillColourNoYearBase = config.fillColourNoYearBase || "#7E7E7E";

		config.groupHeight = config.groupHeight || 25;
		
		if( config.groupGapHeight === undefined ) {
			config.groupGapHeight = 5; // can be zero
		}
		if( config.groupNameWidth === undefined ) {
			config.groupNameWidth = 200; // can be zero
		}
		if( config.pieSize === undefined ) {
			config.pieSize = Math.min(config.groupHeight, 25);
		}
		
		//
		/* Convert dataAll into a usable format */
		//
		catalogues = Object.keys(dataTemp);
		var limit = catalogues.length;//10;//
		//for( var i=0; i < limit; i++ ) {
		//	var catName = catalogues[i],
		//}

		var yearsStart = dataTemp[catalogues[0]]["start"],
			yearsEnd = dataTemp[catalogues[0]]["end"],
			maxGroupNumber = 50000;

		for (var i = 0; i < limit; i++) {

			var catName = catalogues[i],
				start = dataTemp[catName]["start"],
				end = dataTemp[catName]["end"],
				count = 0, number,
				years = [], y;

			var d = {
				id: dataTemp[catName]["id"],
				name: catName
			};

			for (y = start; y <= end; y++) {
				number = 0;
				if (y in dataTemp[catName]) {
					number = dataTemp[catName][y]
				}

				if (number != 0) {
					years.push({
						"year": y,
						"number": number,
						"parent": d
					});
					count += number;
				}
			}

			if( timeline.noYear in dataTemp[catName] ) { // TODO: Remove the need for this.
				d.noYears = dataTemp[catName][timeline.noYear];
				count += d.noYears;
			}
			else {
				d.noYears = 0;
			}

			d.count = count;
			d.years = years;
			d.year = {
				start: start,
				end: end
			};

			if (d.year.start < yearsStart) {
				yearsStart = d.year.start;
			}
			if (d.year.end > yearsEnd) {
				yearsEnd = d.year.end;
			}

			if( count > maxGroupNumber ) {
				maxGroupNumber = count;
			}

			_dataAll.push(d);
		}

		var maxYearNumber = getMaxYearNumber(_dataAll);

		dataTemp = null;

		_dataFiltered = filterData(_dataAll, function () {
			// TODO: Some filtering mechanism, probably picked up from url.
			// so we can link to different portions of the timeline
			return true;
		});


		//
		/* Create D3 Chart */
		//

		var chartDiv = d3.select(".chart"),
			chart = chartDiv.append("svg");

		var scaleHeight = 30,
			groupNameWidth = 200,
			sideGap = 10;
		
		var	noYearSpace = config.pieSize,
			groupHeight = config.groupHeight,
			groupGapHeight = config.groupGapHeight;
		
		var chartHeight = _dataAll.length * (groupHeight + groupGapHeight);
		var svgHeight = chartHeight + scaleHeight * 2;

		chart
			.attr("width", "100%")
			.attr("height", svgHeight);

		var svgWidth = chartDiv[0][0].clientWidth;

		var chartX = groupNameWidth + noYearSpace + sideGap,
			chartY = scaleHeight,
			chartWidth = svgWidth - chartX - sideGap;

		var defaultStartYear = yearsStart,
			defaultEndYear = yearsEnd,

			chartStartYear = defaultStartYear,
			chartEndYear = defaultEndYear,

			previousStartYear,
			previousEndYear;

		var debug = false;
		if( debug ) {
			// Paint group name space
			chart.append("rect")
				.attr("fill", "rgba(50,50,50,0.7)")
				.attr("stroke", "green")
				.attr("stroke-width", "10")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width", groupNameWidth)
				.attr("height", chartHeight);

			// Paint piechart space
			chart.append("rect")
				.attr("fill", "rgba(100,100,100,0.7)")
				.attr("stroke", "red")
				.attr("stroke-width", "10")
				.attr("x", groupNameWidth)
				.attr("y", chartY + 10)
				.attr("width", noYearSpace)
				.attr("height", chartHeight);

			// Paint main chart space
			chart.append("rect")
				.attr("fill", "rgba(150,150,150,0.7)")
				.attr("stroke", "blue")
				.attr("stroke-width", "10")
				.attr("x", chartX)
				.attr("y", chartY)
				.attr("width", chartWidth)
				.attr("height", chartHeight);
		}

		// generate xscale range
		var xScale = d3.time.scale()
				.range([chartX, chartX + chartWidth])
				.domain([yearToDate(chartStartYear), yearToDate(chartEndYear+1)]);

		var sizeScale = d3.scale.linear()
				.range([2, groupHeight])
				.domain([1, maxYearNumber]);

		var pieScale = d3.scale.log()
				.range([noYearSpace/3,noYearSpace/2])
				.domain([1,maxGroupNumber]);

		var fillColour = d3.rgb(config.fillColourBase),
			fillColourNoYear = d3.rgb(config.fillColourNoYearBase),
			colourScale = d3.scale.log()
				.range([1.9, 0.1])
				.domain([1, maxYearNumber]);

		var idFunction = function (d) {
			return d.name;
		};

		chart.append("g")
			.attr("class", "guidelines")
			.append("line")
			//.classed("mouse", 1)
			.attr("x1", -1)
			.attr("x2", -1)
			.attr("y1", chartY)
			.attr("y2", chartY + chartHeight);

		var brush = d3.svg.brush()
			.x(xScale)
			.on("brushend", function() {
				var extent = brush.extent(),
					startDate = new Date(extent[0]),
					endDate= new Date(extent[1]),
					startDateYear = startDate.getFullYear(),
					endDateYear = endDate.getFullYear();

				// Round to nearest year
				var startDateYearJuly = new Date( startDateYear,7,1,0,0,0,0 ),
					endDateYearJuly = new Date( endDateYear,7,1,0,0,0,0 );

				if( startDate > startDateYearJuly ) {
					startDateYear += 1;
				}
				if( endDate > endDateYearJuly ) {
					endDateYear += 1;
				}

				if( endDateYear - startDateYear <= 2 ) {
					endDateYear = startDateYear + 2;
				}

				chartYears( startDateYear, endDateYear );

				d3.select( ".brush" ).call( brush.clear() );
			});

		chart.append("g")
			.attr("class", "brush")
			.call(brush)
				.selectAll('rect')
				.attr('y', chartY)
				.attr('height', chartHeight);


		// Attach dataFiltered (and create) g areas, which we transform into position
		var gData = chart.selectAll("g.data")
				.data(_dataFiltered, idFunction)
				.enter()
				.append("g")
				.attr("class", "data")
				.attr("transform", function (d, i) {
					return "translate(0," + ( (i * (groupHeight + groupGapHeight) ) + chartY) + ")";
				})
			;

		var arc = d3.svg.arc()
			.innerRadius(0)
			.outerRadius(function(d) {
				return pieScale(d.data.count);//noYearSpace/2;//
			});

		var pie = d3.layout.pie()
			.value(function(d) { return d.value; })
			.sort(null);

		var path = gData
			.append("g")
			.attr("class","pie")
			.attr("transform", function () {
				return "translate(" + (chartX - sideGap - noYearSpace/2) + "," + groupHeight/2 + ")";
			})
			.on("mouseover", function (d) {
				overMarker = true;

				var tip = d.count;
				if (config.pieHoverHtml) {
					tip = config.pieHoverHtml(d);
				}
				tooltip.html( tip );
			})
			.on("mouseout", function () {
				overMarker = false;
			})
			.on("click", function () {
				if( config.pieClick ) {
					config.pieClick(d);
				}
			})
			.selectAll('path')
			.data( function(d) {
				var pieData = [];
				if( d.noYears > 0 ) {
					pieData.push( { value: d.noYears, noYear: true, id : d.id, name: d.name, count: d.count } )
				}
				pieData.push( { value: d.count-d.noYears, noYear: false, id : d.id, name: d.name, count: d.count } );
				return pie(pieData);
			})
			.enter()
			.append('path')
			.attr('d', arc )
			.attr('fill', function(d) {
				if( d.data.noYear ) {
					return fillColourNoYear;
				}
				var scale = colourScale(d.data.count);
				return fillColour.brighter(scale).toString();
			});

		var overMarker = false;
		gData.append("g")
			.attr("class","bars")
			.selectAll("rect")
			.data(function (d) {
				var data = [];
				for (var i = 0; i < d.years.length; i++) {
					var o = d.years[i];
					o.parent = d;
					data.push(o);
				}
				return data;//d.years;
			}, function (d) {
				return d.year;
			})
			.enter()
			.append("rect")
			.attr("y", groupHeight / 2) // Start in middle
			.attr("height", 0)
			.attr("rx", 0)
			.attr("ry", 0)
			.attr("fill", function (d) {
				if (d.year === timeline.noYear ) {
					return fillColourNoYear;
				}
				return fillColour;
			})

			.on("mouseover", function (d) {
				overMarker = true;

				var tip = d.year;
				if( config.markerHoverHtml ) {
					tip = config.markerHoverHtml(d);
				}
				tooltip.html(tip);
			})
			 .on("mouseout", function () {
				overMarker = false;
			})
			  .on("click", function (d) {
				if( config.markerClick ) {
					config.markerClick(d);
				}
			})
		;

		// Attach name of catalogue
		gData.append("text")
			.html(function (d) {
				if (config.groupNameHtml) {
					return config.groupNameHtml(d);
				} else {
					var name = d.name;
					if (name.length > 25) {
						name = name.substr(0, 22) + "...";
					}
					return name;
				}
			})
			.attr("y", function() {
				var box = this.getBBox();
				return groupHeight * 0.56;//( groupHeight - box.height )/2;// TODO: Get this to work...
			})
			.attr("x", function () {
				return groupNameWidth - this.getBBox().width - 10; // This -10 is really naughty... but there must be a gap after the text...
			})

			//.on("mouseover", function(d) {
			//	tooltip.style("visibility", "visible");
			//	tooltip.html( "<b>" + d.name + "</b><br/>"
			//		+ d.year.start + " to " + d.year.end + "<br/>"
			//		+ d.count + "letters<br/>"
			//		+ '<p style="text-align:right;width:100%;margin:0"><small>(click to learn more)</small></p>');
			//})
			//.on("mouseout", function() {
			//	tooltip.style("visibility", "hidden");
			//})
			.append("title")
			.text(function (d) {
				return d.name;
			});


		//
		/* Create two horizontal axes... */
		//
		var xAxisBottom = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.tickFormat(d3.time.format("%Y"));

			xAxisTop = d3.svg.axis()
				.scale(xScale)
				.orient("top")
				.tickFormat(d3.time.format("%Y"));

		chart.append("g")
			.attr("class", "x axis top")
			.attr("transform", "translate(0," + chartY + ")")
			.call(xAxisTop);

		chart.append("g")
			.attr("class", "x axis bottom")
			.attr("transform", "translate(0," + (svgHeight - scaleHeight) + ")")
			.call(xAxisBottom);


		//
		/* Tooltip setup */
		//
		var tooltip = d3.select("body")
			.append("div")
			.classed("mytooltip", 1)
			.text("");

		var formatTooltipYear = d3.time.format( "%Y" );

		chart
			.on("mouseover", function () {
				return tooltip.style("visibility", "visible");
			})
			.on("mousemove", function () {
				var pos = d3.mouse(chart.node());

				//if (pos[0] > chartX && pos[1] > chartY && pos[0] < chartX + chartWidth && pos[1] < chartY + chartHeight) {

					var minX = xScale(yearToDate(chartStartYear));

					if (!overMarker) {
						if (pos[0] > minX) {
							tooltip.text( formatTooltipYear(xScale.invert(pos[0]) ) );
							tooltip.style("visibility", "visible");
						}
						else {
							tooltip.style("visibility", "hidden");
						}
					}

					var limitX = Math.max(pos[0], minX);

					chart.select("g.guidelines line.mouse")
						.attr("x1", limitX)
						.attr("x2", limitX);
				//}
				//else {
				//	tooltip.style("visibility", "hidden");
				//	chart.select("g.guidelines line.mouse")
				//		.attr("x1", -5)
				//		.attr("x2", -5)
				//}

				tooltip.style("top", (d3.event.pageY - 50) + "px");
				// Work out tooltip direction, left or right
				var tooltipWidth = (tooltip.style("width").replace("px","") * 1) + 20;
				if( d3.event.pageX > chartWidth/2 + chartX ) {
					tooltip.style("left", (d3.event.pageX - tooltipWidth ) + "px");
				}
				else {
					tooltip.style("left", (d3.event.pageX + 20) + "px");
				}

				return tooltip
			})
			.on("mouseout", function () {
				return tooltip.style("visibility", "hidden");
			})
		;

		function updateOrder(orderFunction) {
			/* reorder bars on chart */

			_dataAll.sort(orderFunction);
			_dataFiltered = filterDataYears(_dataAll, chartStartYear, chartEndYear);

			chart.selectAll("g.data")
				.data(_dataFiltered, idFunction)
				// Update existing bars...
				.transition()
				.delay(0)
				.duration(1000)
				.attr("transform", function (d, i) {
					return "translate(0," + ( (i * (groupHeight + groupGapHeight) ) + chartY) + ")";
				})
			;
		}

		var initial = true;

		function update(data) {
			/* Update to the correct chart, years or counts */

			var d3DataGroup;
			var yearBuffer = 0;//Math.ceil( (chartEndYear - chartStartYear) * 0.03 );
			var circleDuration = 2000,
				circleDelay = 0,
				axisDuration = 2000,
				ease = "easeInCirc";

			if (initial) {
				circleDuration = 500;
				circleDelay = function (d) {
					return (d.year - chartStartYear) * 3;
				};
				axisDuration = 500;
				ease = "linear";

				initial = false;
			}
			else {
				var yearChange = Math.max(Math.abs(previousStartYear - chartStartYear), Math.abs(previousEndYear - chartEndYear)),
					duration = yearChange * 10;
				if (duration > 1500) {
					duration = 1500;
				}
				else if (duration < 800) {
					duration = 800;
				}
				circleDuration = axisDuration = duration;
			}

			/* update catalogue group */
			d3DataGroup = gData
				.data(data, idFunction);

			d3DataGroup
				.transition()
				.ease(ease)
				.duration(circleDuration)
				.attr("transform", function (d, i) {
					return "translate(0," + ( (i * (groupHeight + groupGapHeight) ) + chartY) + ")";
				});

			d3DataGroup
				.exit()
				.transition()
				.ease(ease)
				.duration(circleDuration)
				.attr("transform", function () {
					return "translate(0," + (chartHeight + groupHeight * 3) + ")";
				});

			d3DataGroup
				.enter()
				.append("g")
				.attr("class", "data")
				.attr("transform", function (d, i) {
					return "translate(0," + ((i * (groupHeight + groupGapHeight)) + chartY) + ")";
				});

			xScale.domain([yearToDate(chartStartYear - yearBuffer), yearToDate(chartEndYear + yearBuffer + 1)]);

			var maxNumber = getMaxYearNumber(data);
			colourScale
				.domain([1, maxNumber]); // keep radii same for entire set, but change colour based on subset

			d3DataGroup = gData.select("g.bars").selectAll("rect")
				.data(function (d) {
					return d.years
				}, function (d) {
					return d.year;
				});

			d3DataGroup
				.attr("fill-opacity", function (d) {
					return "0.8"; // Reveal all while we transition
				})
				.transition()
				.ease(ease)
				.delay(circleDelay)
				.duration(circleDuration)
				.attr("y", function (d) {
					return (groupHeight - (sizeScale(d.number) * config.scaleMarkers)) / 2;
				})
				.attr("x", function (d) {
					return xScale(yearToDate(d.year));
				})
				.attr("width", function (d) {
					return xScale(yearToDate(d.year)) - xScale(yearToDate(d.year - 1));
				})
				.attr("height", function (d) {
					return sizeScale(d.number) * config.scaleMarkers;
				})
				.attr("fill-opacity", function (d) {
					var op = 1;

					if( d.year < chartStartYear || d.year > chartEndYear-1 ) {
						op = 0;
					}
					// if (d.year < chartStartYear - yearBuffer || d.year > chartEndYear + yearBuffer) {
					// 	// totally outside of range
					// 	op = 0;
					// }
					// else if (d.year > chartStartYear && d.year < chartEndYear) {
					// 	// totally inside range
					// 	op = 1;
					// }
					// else {
					// 	// Inside buffer region.
					// 	if (d.year < chartStartYear) {
					// 		op = (chartStartYear - d.year) / yearBuffer;
					// 	}
					// 	else {
					// 		op = (d.year - chartEndYear ) / yearBuffer;
					// 	}
					// 	op = 1 - op;
					// }
					return op.toString();
				})
				.attr("stroke-opacity", function (d) {
					var op = 1;
					if( d.year < chartStartYear || d.year > chartEndYear-1 ) {
						op = 0;
					}
					return op.toString();
				})
				.style("pointer-events", function(d) {
					var pointerEvents = "all";
					if( d.year < chartStartYear || d.year > chartEndYear-1 ) {
						pointerEvents = "none";
					}
					return pointerEvents;
				})
				/*.style("visibility", function(d) {
					var visibility = "visible";
					if (d.year < chartStartYear - yearBuffer || d.year > chartEndYear + yearBuffer) {
						visibility = "hidden";
					}
					return visibility;
				})*/
				.attr("fill", function (d) {
					var scale = colourScale(d.number);
					return fillColour.brighter(scale).toString();
				});

			d3DataGroup
				.exit();
			//.transition()
			//.delay(function(d) { return (d.year - chartStartYear) * 3;})
			//.duration(1000)
			//.attr("r",0 );


			var dataChartHeight = ( (groupHeight + groupGapHeight) * data.length );

			var xAxisTickLimit;
			if( chartEndYear - chartStartYear <= 5 ) {
				xAxisTickLimit = chartEndYear - chartStartYear;
			}

			xAxisTop.ticks(xAxisTickLimit);
			xAxisBottom.ticks(xAxisTickLimit);

			// Redraw x-axis with years
			chart.select(".x.axis.top")
				.transition()
				.ease(ease)
				.duration(axisDuration)
				.call(xAxisTop);

			chart.select(".x.axis.bottom")
				.transition()
				.ease(ease)
				.duration(circleDuration) // use circle duration, otherwise it "overtakes" the circle transition
				.call(xAxisBottom)
				.attr("transform", "translate(0," + (dataChartHeight + chartY) + ")");


			var xAxisTicks = xScale.ticks();//xAxisTickLimit);

			// Create some guidelines so we can see where years come in.
			var guidelines = chart.select("g.guidelines").selectAll("line.guideline")
				.data(xAxisTicks);

			guidelines
				.transition()
				.duration(circleDuration)
				.attr("x1", function (d) {
					return xScale(yearToDate(d));
				})
				.attr("x2", function (d) {
					return xScale(yearToDate(d));
				})
				.attr("y1", chartY)
				.attr("y2", chartY + dataChartHeight);

			guidelines
				.enter()
				.append("line")
				.classed("guideline", 1)
				.attr("x1", function (d) {
					return xScale(yearToDate(d));
				})
				.attr("x2", function (d) {
					return xScale(yearToDate(d));
				})
				.attr("y1", chartY)
				.attr("y2", chartY + dataChartHeight);

			guidelines
				.exit()
				.remove();

			chart.select("g.guidelines line.mouse")
				.transition()
				.duration(circleDuration)
				.attr("y2", chartY + dataChartHeight);

			d3.select( ".brush" )
				.selectAll('rect')
				.attr('y', chartY)
				.attr('height', dataChartHeight);

			var svgHeight = chart.attr("height"),
				svgHeightChangeDuration = circleDelay + circleDuration;

			if( svgHeight < dataChartHeight ) {
				svgHeightChangeDuration = 0;
			}

			chart
				.transition()
				.delay(svgHeightChangeDuration)
				.attr("height", dataChartHeight + scaleHeight + scaleHeight);
		}

		function filterData(data, filterer) {
			return data.filter(filterer);
		}

		function filterDataYears(data, start, end) {
			return filterData(data, function (d) {
				for (var y = 0; y < d.years.length; y += 1) {
					if ( d.years[y].year > start && d.years[y].year < end) {
						return true;
					}
				}
				return false;
			});
		}

		function chartYears(start, end) {

			if( start > end ) {
				var realStart = end;
				end = start;
				start = realStart;
			}

			previousStartYear = chartStartYear;
			previousEndYear = chartEndYear;

			chartStartYear = start;
			chartEndYear = end+1; //End at the end of the year

			_dataFiltered = filterDataYears(_dataAll, chartStartYear, chartEndYear);

			update(_dataFiltered);
			
			if( config.yearChange ) {
				config.yearChange( start, end )
			}
		}

		function getMaxYearNumber(data) {
			var max = 0;

			for (var i = 0; i < data.length; i++) {
				var years = data[i].years;
				for (var j = 0; j < years.length; j++) {
					if ( years[j].number > max) {
						max = years[j].number;
					}
				}
			}

			return max;
		}

		function getMinYearNumber(data) {
			var min = 100000;

			for (var i = 0; i < data.length; i++) {
				var years = data[i].years;
				for (var j = 0; j < years.length; j++) {
					if ( years[j].number < min) {
						min = years[j].number;
					}
				}
			}

			return min;
		}

		function yearToDate( intYear ) {
			return new Date( intYear+"" );
		}


		// Update the chart on load, this makes the first rectangles "appear".
		setTimeout(function () {
			update(_dataFiltered);
		}, 10);

		return {
			showYears: function (yearStart, yearEnd) {
				yearStart = yearStart || defaultStartYear;
				yearEnd = yearEnd || defaultEndYear;
				chartYears(yearStart, yearEnd);
			},
			reorder: function (sortFunction) {
				updateOrder(sortFunction);
			},
			startYear : defaultStartYear,
			endYear : defaultEndYear
		}
	}
};
 