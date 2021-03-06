(function(person_data) {

    var all_charts = ['creator', 'recipient', 'mentioned'],
		all_chart_titles = ['Letters written', 'Letters received', 'Letters mentioning'],
		stacked = 1, split = 2, separate = 3,
		unknownYear = "9999",
        unknownYearText = "?",
		i,

    	have = {
			creator: false,
			recipient: false,
			mentioned: false,
			unknown: false
		},

		person_data_without_unknown,
        person_data_with_unknown

		;

    if (person_data[person_data.length - 1].year === unknownYear * 1) {
        have.unknown = true;
        person_data_with_unknown = person_data;
        person_data_without_unknown = person_data.slice(0,-1); // Shallow clone!
    }
	else {
		person_data_without_unknown = person_data_with_unknown = person_data;
	}


    // Check we have data for each graph
    for (i = 0; i < all_charts.length; i++) {
        var j,c = all_charts[i];
        for (j = 0; j < person_data_with_unknown.length; j++) {
            if (person_data_with_unknown[j][c] != 0) {
                have[c] = true;
                break;
            }
        }
    }

    // Specify the charts we have
    var charts = [], chart_titles = [];
    for (i = 0; i < all_charts.length; i++) {
        if (have[all_charts[i]]) {
            charts.push(all_charts[i]);
            chart_titles.push(all_chart_titles[i]);
        }
    }

	// Check we only have unknowns
	var showUnknown = true;
	for (i = 0; i < person_data_without_unknown.length; i++) {
		for (j = 0; j < all_charts.length; j++) {
			if (person_data_with_unknown[i][all_charts[j]] != 0) {
				showUnknown = false;
				break;
			}
		}

		if( !showUnknown ) {
			break;
		}
	}

	//
	// Create the Chart
	//

    var svg_height_base = 120,
        svg_chart_gap = 25,
        label_space_bottom = 20,
        label_space_top = 20,
        label_space_left = 35,
        label_space_right = 15,

		bars_are = separate; // could also be : stacked , split

    var svg_width = d3.select("#chart").style("width").replace( "px", ""),
		svg_height = svg_height_base * charts.length + svg_chart_gap * ( charts.length - 1 ),
		chart_width = svg_width - label_space_left - label_space_right;

    var svgChart = d3.select('#chart')
            .append("svg")
            .attr("class", "chart single")
            .attr("width", svg_width)
            .attr("height", svg_height)
        ;


    function getMax(person_data, includeUnknown) {

        return d3.max(person_data, function (d) {
            if (!includeUnknown && d.year == unknownYear) {
                return 0;
            }

            if (bars_are == stacked) {
                return d.creator + d.recipient + d.mentioned;
            }

            return d3.max([d.creator, d.recipient, d.mentioned]);
        });

    }

    function getXScaleDomain(person_data,showUnknown) {
        var xDomain = [],person_data_length = person_data.length;
        for (var j = 0; j < person_data_length; j++) {
            var year = person_data[j].year;

            if (showUnknown || year != unknownYear) {
                if (year == unknownYear)
                    xDomain.push(unknownYearText);
                else
                    xDomain.push(year);
            }
        }

        return xDomain;
    }

    function getXAxisTicks(xScaleDomain, chart_width) {
		// Work out what years to display given space.
		var xAxisTicksDomain = xScaleDomain,
			xAxisTicks = [],
			widthBar = chart_width / xAxisTicksDomain.length,
			ticks_every = 10,
			val, j;

		if (widthBar > 40) {
			ticks_every = 1;
		}
		else if (widthBar > 20) {
			ticks_every = 3;
		}
		else if (widthBar > 10) {
			ticks_every = 5;
		}

        for (j = 0; j < xAxisTicksDomain.length; j++) {
            val = xAxisTicksDomain[j];
            if (j % ticks_every == 0 || val == unknownYearText) {
                xAxisTicks.push(val);
            }
        }

        return xAxisTicks;
    }

    function getYAxisTickNumber(max_value, bars_are) {
        // Vertical lines
        var y_ticks = 3;
        if (max_value < y_ticks) {
            y_ticks = max_value;
        }
        else if (bars_are != separate && max_value >= y_ticks * 3) {
            y_ticks *= 3;
        }
        return y_ticks;
    }

    function getYAxisSubTickNumber(yAxisTicks, bars_are) {
        if (bars_are != separate) {
            if (yAxisTicks && yAxisTicks.length >= 2) {
                var sep = yAxisTicks[1] - yAxisTicks[0] - 1;
                return d3.min([sep, 4]); // TODO, work out a good value;
            }
        }

        return 0;
    }

    function getChart(number) {
        if (number < charts.length) {
            return charts[number];
        }
        return "";
    }

    if (showUnknown) {
        person_data = person_data_with_unknown;
    } else {
        person_data = person_data_without_unknown;
    }

    var max_value = getMax(person_data, showUnknown),
		person_data_length = person_data.length,
		beginning = true,
		axes = [];

    for (i = 0; i < charts.length; i++) {

        var chart = charts[i];
        if (have[chart]) {

            var chart_height = svg_height_base - label_space_top - label_space_bottom,
				chart_x = label_space_left,
                chart_y = ( i * (svg_height_base + svg_chart_gap) ) + label_space_top;


            // Draw title
            svgChart.append("text")
                .classed("chart-title", 1)
                .classed(chart, 1)
                .attr("x", chart_x - 10)
                .attr("y", chart_y - 10)
                .text(chart_titles[i])
            ;

            //
            // Create Y scale
            //
            var yScale = d3.scale.linear();

            //var stretchLowerYScale = false;
            //stretchLowerYScale = ( (max_value / 4) > 10 );
            //if( stretchLowerYScale )
            //	yScale.domain( [0,10,max_value] ).range( [chart_height,chart_height - chart_height/4,0] ); // enhance values between 1 and 10 so we can see them easier.
            //else
            yScale.domain([0, max_value]).rangeRound([chart_height, 0]);

            //
            // Create Xscale
            //
            var xScaleDomain = getXScaleDomain(person_data,showUnknown);
            var xScale = d3.scale.ordinal()
                    .domain(xScaleDomain)
                    .rangeRoundBands([0, chart_width], 0.2)
                ;

            var y_ticks = getYAxisTickNumber(max_value, bars_are);

            var yTickMarks = yScale.ticks(y_ticks);
            //if( stretchLowerYScale ) {
            //	yTickMarks.push(10);
            //}
            svgChart.append("svg:g").classed("guidelines", 1).selectAll("line.guideline." + chart)
                .data(yTickMarks, function (d, j) {
                    return (d == 0) ? 0 : j + "-" + chart;
                })
                .enter().append("line")
                .classed("guideline", 1)
                .classed(chart, 1)
                .attr("x1", chart_x)
                .attr("x2", chart_x + chart_width)
                .attr("y1", function (d) {
                    return chart_y + yScale(d);
                })
                .attr("y2", function (d) {
                    return chart_y + yScale(d);
                })
            ;

            //
            // Axes
            //
            var xAxisTicks = getXAxisTicks(xScale.domain(), chart_width);
            var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .tickValues(xAxisTicks)
                ;

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickFormat(d3.format("f"))
                .ticks(y_ticks)
                .tickSize(4, 2, 0);

            yAxis.tickSubdivide(getYAxisSubTickNumber(yScale.ticks(y_ticks), bars_are));

            axes[chart] = {
                x: xAxis,
                y: yAxis
            };

            svgChart.append("svg:g")
                .classed("xaxis", 1).classed("axis", 1).classed("label", 1).classed(chart, 1)
                .attr("transform", "translate(" + chart_x + "," + (chart_y + chart_height) + ")")
                .call(xAxis)
            ;

            svgChart.append("svg:g")
                .classed("yaxis", 1).classed("axis", 1).classed("label", 1).classed(chart, 1)
                .attr("transform", "translate(" + chart_x + "," + chart_y + ")")
                .call(yAxis)
            ;

        }
    }

    function updateCharts(duration, delay) {

        person_data = ( showUnknown ) ? person_data_with_unknown : person_data_without_unknown;
        person_data_length = person_data.length;

        max_value = getMax(person_data, showUnknown, chart);

        var chart_height = svg_height_base - label_space_top - label_space_bottom;
        var chart_x = label_space_left;

        if (bars_are == stacked || bars_are == split) {
            chart_height = svg_height - label_space_top - label_space_bottom;
        }

        //
        // Update Y scale
        //
        //stretchLowerYScale = ( (max_value / 4) > 10 );
        //if( stretchLowerYScale )
        //	yScale.domain( [0,10,max_value] ).range( [chart_height,chart_height - chart_height/4,0] ); // enhance values between 1 and 10 so we can see them easier.
        //else
        yScale.domain([0, max_value]).range([chart_height, 0]);


        //
        // Update Xscale
        //
        var xScaleDomain = getXScaleDomain(person_data,showUnknown);
        xScale.domain(xScaleDomain);

        //
        // Axes
        //

        // Work out what years to display given space.
        var xAxisTicks = getXAxisTicks(xScale.domain(), chart_width);

        var y_ticks = getYAxisTickNumber(max_value, bars_are)

        // Update axes.
        for (j = 0; j < charts.length; j++) {
            var chart = charts[j],
				xAxis = axes[chart].x,
				yAxis = axes[chart].y;

            xAxis.scale(xScale)
                .tickValues(xAxisTicks)
            ;

            yAxis.scale(yScale)
                .ticks(y_ticks)
            ;

            yAxis.tickSubdivide(getYAxisSubTickNumber(yScale.ticks(y_ticks), bars_are));

            svgChart.select(".xaxis." + chart)
                .transition().duration(duration)
                .call(xAxis)
            ;

            svgChart.select(".yaxis." + chart)
                .transition().duration(duration)
                .call(yAxis)
            ;
        }

        // Vertical lines
        var yTickMarks = yScale.ticks(y_ticks);
        //if( stretchLowerYScale ) {
        //	yTickMarks.push(10);
        //}

		var guidelines = svgChart.select("g.guidelines").selectAll("line.guideline." + getChart(0))
            .data(yTickMarks, function (d, i) {
                return (d == 0) ? 0 : i + "-" + getChart(0);
            });

		 guidelines.enter().append("line")
            .classed("guideline", 1)
            .classed(getChart(0), 1)
            .attr("x1", chart_x)
            .attr("x2", chart_x + chart_width)
            //.attr("y1", chart_y)
            //.attr("y2", chart_y)
        ;

        guidelines.exit().remove();

        guidelines
            .transition().duration(duration)
            .attr("y1", function (d) {
                return label_space_top + yScale(d);
            })
            .attr("y2", function (d) {
                return label_space_top + yScale(d);
            })
        ;

        function fade(item, fade_in) {
            if (fade_in) {
                svgChart.selectAll(item).transition().duration(duration / 2).delay(3 * duration / 2).style('opacity', '1');
            } else {
                svgChart.selectAll(item).transition().duration(3 * duration / 2).style('opacity', '0');
            }
        }

        if (bars_are == stacked || bars_are == split) {
            for (i = 0; i < charts.length - 1; i++) { // first ones
                fade(".xaxis." + charts[i], false);
            }

            for (i = 1; i < charts.length; i++) { // last ones
                fade(".yaxis." + charts[i], false);
                fade(".guideline." + charts[i], false);
                fade(".chart-title." + charts[i], false);
            }

            var title = chart_titles[0];
            if (charts.length == 3)
                title += ", " + chart_titles[1] + " and " + chart_titles[2];
            else if (charts.length == 2)
                title += " and " + chart_titles[1];

            svgChart.select(".chart-title." + getChart(0))
                .text(title)

        }
        if (bars_are == separate) {

            for (i = 0; i < charts.length - 1; i++) {
                fade(".xaxis." + charts[i], true);
            }

            for (i = 1; i < charts.length; i++) {
                fade(".yaxis." + charts[i], true);
                fade(".guideline." + charts[i], true);
                fade(".chart-title." + charts[i], true);
            }

            if (charts.length > 0) {
                svgChart.select(".chart-title." + getChart(0))
                    .text(chart_titles[0])
            }
        }

        for (i = 0; i < charts.length; i++) {

            var chart = charts[i];
            if (have[chart]) {

                var chart_y = ( i * (svg_height_base + svg_chart_gap) ) + label_space_top;
                if (bars_are == stacked || bars_are == split) {
                    chart_y = label_space_top;
                }

                //
                // Bars
                //
                var bars = svgChart.selectAll("rect." + chart).data(person_data, function (d) {
                    return d.year + "-" + chart;
                });

                // Create any new bars
                bars.enter().append("rect")
                    .classed("bar", 1)
                    .classed(chart, 1)
                    .attr("x", chart_x + chart_width + 2) // hide off right
                    .attr("y", chart_y + chart_height)
                    .attr("width", xScale.rangeBand())
                    .attr("height", 0)
                    .classed("unknown", function (d) {
                        return d.year == unknownYear;
                    })
                ;

                // Remove unwanted bars
                bars.exit()
                    .transition().duration(duration)
                    .attr("x", chart_x + chart_width + 2) // hide off right
                    .remove()
                ;

                bars.append("title")
                    .text(function (d) {
                        var year = (d.year != unknownYear) ? d.year : "Years unknown";
                        return year + ": " + d[chart] + " " + chart_titles[i];
                    })
                ;

                if (beginning) {
                    // when first open we don't want things to move in from right.
                    bars.attr("x", function (d, i) {
                        return chart_x + xScale(i);
                    });
                }

                // Update all bars
                bars.transition().duration(duration).delay(delay)
                    .attr("x", function (d, i) {
                        var offset = 0;
                        if (bars_are == split) {
                            if (chart == getChart(1))
                                offset = xScale.rangeBand() / charts.length;
                            else if (chart == getChart(2))
                                offset = xScale.rangeBand() * 2 / charts.length;
                        }

                        return chart_x + xScale(i) + offset;
                    })
                    .attr("y", function (d) {
                        var value = d[chart]

                        if (bars_are == stacked) {
                            if (chart == getChart(0))
                                for (j = 1; j < charts.length; j++)
                                    value += d[charts[j]];
                            else if (chart == getChart(1))
                                for (j = 2; j < charts.length; j++)
                                    value += d[charts[j]];
                        }

                        return chart_y + yScale(value);
                    })
                    .attr("width", function () {
                        if (bars_are == split)
                            return xScale.rangeBand() / charts.length;

                        return xScale.rangeBand();
                    })
                    .attr("height", function (d) {
                        return chart_height - yScale(d[chart]);
                    })
                ;

            }

        }

        beginning = false;
    }


    function hide(selectors, hide) {
        for (var i = 0; i < selectors.length; i++) {
            d3.select(selectors[i]).style("display", (hide) ? "none" : "inline-block");
        }
    }

    function highlight(selectors, highlight) {
        for (var i = 0; i < selectors.length; i++) {
            d3.select(selectors[i]).classed("highlight", highlight);
        }
    }

    function unknownShow(show) {
        if (show) {
            highlight(["#show_unknown"], true);
            //highlight(["#hide_unknown"], false);
			d3.select("#show_unknown").text("Hide unknown");
            showUnknown = true;

        } else {
            //highlight(["#hide_unknown"], true);
            highlight(["#show_unknown"], false);
			d3.select("#show_unknown").text("Show unknown");

            showUnknown = false;
        }

        updateCharts(1000, function (d, i) {
            if(d.creator === 0 && d.recipient === 0 && d.mentioned === 0 ) {
                return 0;
            }

            // Work out how many bars we've already moved, skip over empty ones.
            for( var j= 0,count=0;j<i;j++) {
                if (person_data[j].creator !== 0 ||
                    person_data[j].recipient !== 0 ||
                    person_data[j].mentioned !== 0) {
                    count += 1;
                }
            }
            return (person_data_length - count - 1) * (1200 / person_data_length);
        });
    }

    function switchBars(bars_should_be) {
        bars_are = bars_should_be;

        highlight(["#bars_stacked", "#bars_split","#bars_seperate"], false);
        highlight(["#bars_"+bars_should_be], true);

        updateCharts(1000, function (d, i) {
            if(d.creator === 0 && d.recipient === 0 && d.mentioned === 0 ) {
                return 0;
            }

            // Work out how many bars we've already moved, skip over empty ones.
            for( var j=0,count=0;j<i;j++) {
                if (person_data[j].creator !== 0 ||
                    person_data[j].recipient !== 0 ||
                    person_data[j].mentioned !== 0) {
                    count += 1;
                }
            }
            return (person_data_length - count - 1) * (1300 / person_data_length);
        });
    }

    if (charts.length > 0) {

        d3.select("#hide_unknown").on("click", function() {
			unknownShow(false);
        });

        d3.select("#show_unknown").on("click", function() {
			unknownShow(!showUnknown);
        });

        d3.select("#bars_seperate").on("click", function() {
            switchBars(separate);
        });
        d3.select("#bars_stacked").on("click", function() {
            switchBars(stacked);
        });
        d3.select("#bars_split").on("click", function() {
            switchBars(split);
        });

		// Check for fullscreen lunch
		var d3FullscreenButton = d3.select(".csstransforms #fullscreen"); // assuming modernizr

		if( d3FullscreenButton ) {
			hide(["#fullscreen"], false);

			var fullscreen = false;
			d3FullscreenButton.on("click", function () {

				var d3Chart = d3.select("#chart");
				if (fullscreen) {
					d3Chart.style("-ms-transform", "" );
					d3Chart.style("-webkit-transform", "" );
					d3Chart.style("transform", "");
					d3FullscreenButton.text("Fullscreen");
				} else {

					d3FullscreenButton.text("Close");

					var gapWidth = window.innerWidth * 0.02,
						gapHeight = window.innerHeight * 0.02,
						winWidth = window.innerWidth - (gapWidth*2),
						winHeight = window.innerHeight - (gapHeight*2),
						chartBox = d3Chart.node().getBoundingClientRect(),
						scaleWidth = winWidth/chartBox.width,
						scaleHeight = winHeight/chartBox.height,
						scale = 1;

					scale = scaleHeight;
					if( scale * chartBox.width > winWidth ) {
						scale = scaleWidth;
					}

					var centredX = ( (window.innerWidth - chartBox.width) / 2),
						centredY = ( (window.innerHeight - chartBox.height) / 2);

					var transform = "";
					transform += "scale("+ scale + ")";
					transform += " translate("+ (centredX - chartBox.left)/scale +"px,"+ (centredY - chartBox.top)/scale +"px)";
					// !! transform += " rotate(180deg)";

					d3Chart.style("-ms-transform", transform );
					d3Chart.style("-webkit-transform", transform );
					d3Chart.style("transform", transform );
				}

				fullscreen = !fullscreen;
				highlight(["#fullscreen"], fullscreen);
			});
		}

		highlight(["#show_unknown"], showUnknown);
        hide(["#chart .unknown"], !have.unknown);
        hide(["#chart .bars"], charts.length === 1 );
        hide(["#chart"],false);

        updateCharts(500, function (d, i) {
	        if(d.creator === 0 && d.recipient === 0 && d.mentioned === 0 ) {
		        return 0;
	        }

	        // Work out how many bars we've already moved, skip over empty ones.
	        for( var j= 0,count=0;j<i;j++) {
		        if (person_data[j].creator !== 0 ||
			        person_data[j].recipient !== 0 ||
			        person_data[j].mentioned !== 0) {
			        count += 1;
		        }
	        }
	        return (count * 40);
        });
    }

})(person_data);