(function(){

	var dget = function(member) { return function(d) {return d[member]}; };

	var dataPostgres = catalogueYearsCount,
		dataTemp = {}, i;

	var undated = "no year";
	var allCatalogueName = 'All Catalogues',
		allCatalogue = {
			name: allCatalogueName,
			id: "ALL",
			count: 0,
			years: []
		};

	//
	// Sort out data
	//
	for( i=0; i < dataPostgres.length; i++ ) {
		var yearData = dataPostgres[i],
			catalogueName = yearData["Catalogue"];

		if( ! (catalogueName in dataTemp) ) {
			dataTemp[catalogueName] = {
				start : 2000,
				end : 0,
				id : yearData["CatalogueId"] || "NCS",
				count: 0,
				years: []
			};

			dataTemp[catalogueName][undated] = 0;
		}

		if( yearData.year === "" ) {
			yearData.year = undated;
		}

		// Create an entry for each year
		dataTemp[catalogueName][yearData.year] = yearData.number;
		dataTemp[catalogueName].count += yearData.number;

		// Duplicating data (because easier to access and too lazy to remove original. Sorry.)
		dataTemp[catalogueName].years.push( {y:yearData.year, n:yearData.number });


		if( yearData.year !== undated) {

			if (yearData.year < dataTemp[catalogueName]["start"]) {
				dataTemp[catalogueName]["start"] = yearData.year;
			}

			if (yearData.year > dataTemp[catalogueName]["end"]) {
				dataTemp[catalogueName]["end"] = yearData.year;
			}
		}

		if( !allCatalogue[yearData.year] ) {
			allCatalogue[yearData.year] = yearData.number;
		}
		else {
			allCatalogue[yearData.year] += yearData.number;
		}
		allCatalogue.count += yearData.number;
	}

	var catalogueNames = Object.keys( dataTemp );
	var catalogueList = [], catalogueListFull,
		maxNumber = 0;

	catalogueNames.forEach( function(name) {
		var catData = dataTemp[name];
		catData.name = name;
		catalogueList.push(catData);
	});

	// Debug
	//catalogueList = catalogueList.slice(0,3);

	allCatalogue.start = d3.min( catalogueList, dget('start') );
	allCatalogue.end = d3.max( catalogueList, dget('end') );

	for( var y=allCatalogue.start,yz=allCatalogue.end;y<=yz;y++) {
		allCatalogue.years.push( {y:y, n:allCatalogue[y] || 0 } );
		if( maxNumber < allCatalogue[y] ) {
			maxNumber = allCatalogue[y];
		}
	}
	// allCatalogue.years.push( {y:yearData.year, n:yearData.number } );

	catalogueList.push( allCatalogue );

	catalogueListFull = catalogueList.slice(0);
	console.log(catalogueListFull);

	function allDates() {

		document.getElementById("from-year").value = allCatalogue.start;
		document.getElementById("to-year").value = allCatalogue.end;

		//d3.select("input#from-year").attr("value", allCatalogue.start);
		//d3.select("input#to-year").attr("value", allCatalogue.end);
	}
	allDates();

	var wideSpace = ' ' /* wide space U+2003*/,
		nonBreakingSpace = ' ', /* "quite" thin space */
		arrowDown = '▼',
		arrowUp = '▲',
		sort = "nameAsc",
		currentFilter = {
			from:allCatalogue.start - 1, // show everything initially but allow
			to: allCatalogue.end + 1
		},
		svgWidth = 100,
		svgHeight = 50;

	catalogueList.sort( orderBy( sort ) );

	var columns = [
		{ id: 'name', head: 'Catalogue name<br/>' + arrowDown + wideSpace, cl: 'title',
			html: dget('name') },
		{ id: 'start', head: 'Year start<br/>' + arrowDown + arrowUp, cl: 'center',
			html: dget('start') },
		{ id: 'end', head: 'Year end<br/>' + arrowDown + arrowUp, cl: 'center',
			html: dget('end') },
		{ id: 'dated', head: 'Letters with years<br/>' + arrowDown + arrowUp, cl: 'num',
			html: function(row) {

				var count = 0;
				for( var y = currentFilter.from; y <= currentFilter.to; y++ ) {
					if( row[y] ) {
						count += row[y];
					}
				}

				return count;
				// return (row[undated]) ? row.count - row[undated] : row.count;
			}
		},
		{ id: 'undated', head: 'Letters without years<br/>' + arrowDown + arrowUp, cl: 'num',
			html: function(row) {
				return row[undated] ? row[undated] : '-';
			}
		},
		{ id: 'total', head: 'Total<br/>' + arrowDown + arrowUp, cl: 'num',
			html: function(row) {
				var count = row[undated] ? row[undated] : 0;
				for( var y = currentFilter.from; y <= currentFilter.to; y++ ) {
					if( row[y] ) {
						count += row[y];
					}
				}

				return count;
			}
		},
		{ id: 'chart', head: 'Coverage<br/>' + wideSpace + wideSpace, cl: 'center',
			html: function( row ) {
				return '<svg id="' + row.id + '" height="' + svgHeight + '" width="' + svgWidth + '"></svg>';
			}
		}
	];

	var table = d3.select("table#cat");

	table.append('thead').append('tr')
		.selectAll('th')
		.data(columns).enter()
		.append('th')
		.attr('class', function(d) { return d.cl; } )
		.attr('id', function(d) {return "head-" + d.id; })
		.html(function(d) { return d.head; } );

	table.append('tbody')
		.selectAll('tr')
		.data(catalogueList, function(d,i){return i/*d.id*/;}).enter()
		.append('tr')
		.classed('all', function(row) { return row.name === allCatalogueName;} )
		.classed('cat', 1)
		.style('opacity', '1' )
		.selectAll('td')
		.data(function(row, i) {
			// evaluate column objects against the current row
			return columns.map(function(c) {
				var cell = {};
				d3.keys(c).forEach(function(k) {
					cell[k] = (typeof c[k] === 'function') ? c[k](row,i) : c[k];
				});
				return cell;
			});
		}).enter()
		.append('td')
		.html(function(d){return d.html;})
		.attr('class', function(d){return d.cl;});

	function updateColumnHeading() {
		//d3.select("#head-dated")
		//	.html( columns[3].head.slice(0,-2) + "<br/>" + currentFilter.from + "-" + currentFilter.to + columns[3].head.slice(-2) );
	}

	function filterByName(list) {
		var filterName = document.getElementById("catalogue-name").value.toLowerCase();
		list = list.filter(function (cat) {
			return cat.name.toLowerCase().indexOf(filterName) !== -1;
		});
		return list;
	}

	function filterByYear(list) {

		var filterYearFromText = document.getElementById("from-year").value,
			filterYearToText   = document.getElementById("to-year").value;

		var filterYearFromBlank = filterYearFromText === '',
			filterYearToBlank = filterYearToText === '',
			filterYearFrom = getYear( filterYearFromText ),
			filterYearTo   = getYear( filterYearToText );

		var haveFrom = (filterYearFrom !== 0),
			haveTo   = (filterYearTo !== 0);

		if( ( filterYearFromBlank && haveTo ) ||
			( filterYearToBlank && haveFrom ) ||
			( haveFrom && haveTo ) ) {

			currentFilter.from =  haveFrom ? filterYearFrom : currentFilter.from;
			currentFilter.to   =  haveTo ? filterYearTo : currentFilter.to;

			updateColumnHeading();

			list = list.filter(function (cat) {

				var keep = false;
				var fromAfterStart = filterYearFrom >= cat.start,
					toAfterStart = filterYearTo >= cat.start,
					fromAfterEnd = filterYearFrom > cat.end,
					toAfterEnd = filterYearTo > cat.end;
				/*
			OK:
				f   t
				|   |     !fromAfterStart && toAfterStart && !fromAfterEnd && !toAfterEnd 0100
				  s+++e

				  |   |     fromAfterStart && toAfterStart && !fromAfterEnd && toAfterEnd 1101
			  s+++e

				|   |     fromAfterStart && toAfterStart && !fromAfterEnd && !toAfterEnd 1100
			   s+++++e

				|   |     !fromAfterStart && toAfterStart && !fromAfterEnd && toAfterEnd 0101
				 s+e
			*/

				if (haveFrom && !haveTo) {
					if (!fromAfterEnd) {
						keep = true;
					}
				}
				else if (!haveFrom && haveTo) {
					if (toAfterStart) {
						keep = true;
					}
				}
				if (haveFrom && haveTo) {
					if (
						(!fromAfterStart && toAfterStart && !fromAfterEnd && !toAfterEnd) ||
						(fromAfterStart && toAfterStart && !fromAfterEnd && toAfterEnd) ||
						(fromAfterStart && toAfterStart && !fromAfterEnd && !toAfterEnd) ||
						(!fromAfterStart && toAfterStart && !fromAfterEnd && toAfterEnd)
					) {
						keep = true;
					}
				}

				return keep;
			});
		}
		return list;
	}

	function runUpdate() {
		var list = filterByYear(catalogueListFull);
		catalogueList = filterByName(list);

		order( sort );
		updatePosition();
		updateData();

		updateChart();
	}

	d3.select('input#catalogue-name').on("input",function() {
		runUpdate();
	});

	d3.select('button#reset-name').on("click",function() {
		document.getElementById("catalogue-name").value = "";
		runUpdate();
	});

	d3.select('input#from-year').on("input",function() {
		runUpdate();
	});
	d3.select('input#to-year').on("input",function() {
		runUpdate();
	});

	d3.select('button#reset-years').on("click",function() {
		allDates();
		runUpdate();
	});

	/*catalogueList.sort( orderBy( "nameDesc" ) );
	setTimeout( function() {
		updatePosition();

		catalogueList = catalogueList.splice(5,10);
		setTimeout( function() {
			updateData();

			catalogueList.sort( orderBy( "nameAsc" ) );

			setTimeout( function() {
				updatePosition();
			}, 1000);
		}, 1000);

	}, 1000 );*/


	function updatePosition() {
		var selection = table.select("tbody")
			.selectAll('tr')
			.data(catalogueList, function(d,i) {
				return i;
			});

		var selectionTd = selection
			.selectAll('td');

		selectionTd
			.style('opacity', 0.5 );

		//setTimeout( function() {
		selectionTd
			.data(function (row, i) {
				// evaluate column objects against the current row
				return columns.map(function (c) {

					var cell = {};
					d3.keys(c).forEach(function (k) {
						cell[k] = (typeof c[k] === 'function') ? c[k](row, i) : c[k];
					});
					return cell;
				});
			})
			.html(function (d) {
				return d.html;
			})
			.attr('class', function (d) {
				return d.cl;
			})
			.style('opacity', 1 );
		//}, timing);

		/*selectionTd
			.transition()
			.delay(timing+50)
			.duration(300)*/


		table.select('thead').select('tr')
			.selectAll('th')
			.data(columns)
			.attr("id", dget("id") )
			.html( dget("head") );
	}

	function updateData() {

		var selection = table.select("tbody")
			.selectAll('tr')
			.data(catalogueList, dget("id") );

		selection.enter()
			.append('tr')
			.classed('cat',1)
			.selectAll('td')
			.data(function (row, i) {
				// evaluate column objects against the current row
				return columns.map(function (c) {
					var cell = {};
					d3.keys(c).forEach(function (k) {
						cell[k] = (typeof c[k] === 'function') ? c[k](row, i) : c[k];
					});
					return cell;
				});
			}).enter()
			.append('td')
			.html(function (d) {
				return d.html;
			})
			.attr('class', function (d) {
				return d.cl;
			});

		selection
			.selectAll('td')
			.data(function (row, i) {
				// evaluate column objects against the current row
				return columns.map( function (c) {

					var cell = {};
					d3.keys(c).forEach(function (k) {
						cell[k] = (typeof c[k] === 'function') ? c[k](row, i) : c[k];
					});
					return cell;
				});
			})
			.html(function (d) {
				return d.html;
			})
			.attr('class', function (d) {
				return d.cl;
			});

		selection.exit()
			.remove();

	}

	function getYear( year ) {
		year = +year;
		if( !isNaN(year) ) {
			if( year >= 1000 ) { // 4 digits (so that typing in years are ignored until all four digits are typed
				return year;
			}
		}

		return 0;
	}

	// Column ordering
	d3.selectAll("#cat th").on("click", function( pushed ) {

		if( pushed.id === 'name') {
			sort = (sort === "nameAsc") ? "nameDesc" : "nameAsc";
		}
		else if( pushed.id === 'start') {
			sort = (sort === "startAsc") ? "startDesc" : "startAsc";
		}
		else if( pushed.id === 'end') {
			sort = (sort === "endAsc") ? "endDesc" : "endAsc";
		}
		else if( pushed.id === 'dated') {
			sort = (sort === "datedAsc") ? "datedDesc" : "datedAsc";
		}
		else if( pushed.id === 'undated') {
			sort = (sort === "undatedAsc") ? "undatedDesc" : "undatedAsc";
		}
		else if( pushed.id === 'total') {
			sort = (sort === "totalAsc") ? "totalDesc" : "totalAsc";
		}

		columns.forEach( function(column) {
			if( column.id !== "chart") {
				if( pushed.head === column.head ) {
					column.head = column.head.slice( 0, -2 );

					if( sort.substring( sort.length-3 ) === "Asc" ) {
						column.head += arrowDown + nonBreakingSpace;
					}
					else {
						column.head += arrowUp  + nonBreakingSpace;
					}
				}
				else {

					column.head = column.head.substring(0, column.head.length - 2) + arrowDown + arrowUp;
				}
			}
		});

		runUpdate();
	});

	function order( by ) {
		catalogueList.sort( orderBy( by ) );
	}

	function orderBy( by ) {
		/* Change the order of "data". */
		if( by === "nameAsc" || by === "nameDesc" ) {
			return generateSort( function(o) {return o.name;}, by === "nameAsc" );
		}
		else if( by === "startAsc" || by === "startDesc" ) {
			return generateSort( function(o) {return o.start;}, by === "startAsc" );
		}
		else if( by === "endAsc" || by === "endDesc" ) {
			return generateSort( function(o) {return o.end;}, by === "endAsc" );
		}
		else if( by === "datedAsc" || by === "datedDesc" ) {
			return generateSort( function(o) { return (o[undated]) ? o.count - o[undated] : o.count; }, by === "datedAsc" );
		}
		else if( by === "undatedAsc" || by === "undatedDesc" ) {
			return generateSort( function(o) {return o[undated];}, by === "undatedAsc" );
		}
		else if( by === "totalAsc" || by === "totalDesc" ) {
			return generateSort( function(o) {return o.count;}, by === "totalAsc" );
		}

		function generateSort( memberFunction, ascending ) {
			/* Generate a sort function with particular features */
			return function(a,b) {
				if( a.name === allCatalogueName ) return -1;
				if( b.name === allCatalogueName ) return 1;
				var compare = ((memberFunction(a) < memberFunction(b)) ? -1 : memberFunction(a) > memberFunction(b));
				if( compare === 0 ) {
					compare = ( (a.name < b.name) ? -1 : a.name > b.name );
				}
				return (ascending) ? compare : compare*-1;
			};
		}
	}

	// Set up charts
	var xScale, heightScale, rectWidth;

	function setUpChart() {
		xScale= d3.scale.linear()
			.domain([allCatalogue.start, allCatalogue.end])
			.range([0, svgWidth]);

		heightScale = d3.scale.linear()
			.domain([0, maxNumber])
			.range([2, svgHeight]);

		rectWidth = svgWidth / allCatalogue.years.length;

		for (var i = 0, z = catalogueList.length; i < z; i++) {
			var cat = catalogueList[i];
			var svg = d3.select("svg#" + cat.id);

			svg.on("click", function () {
				if (svg.property("data-zoomed") === "yes") {
					svg.property("data-zoomed", "no");
					this.style = "z-index: 0; transform: scale(1) translate(0,0px);";
				}
				else {
					svg.property("data-zoomed", "yes");
					this.style = "z-index:10; transform: scale(7) translate(-41px,21px);";
				}
			});

			svg.append("rect")
				.attr("width",svgWidth)
				.attr("height",svgHeight)
				.attr("fill","white")
				.attr("stroke","black")
				.attr("stroke-width","0.5");

			svg.append("line")
				.attr("x2", svgWidth)
				.attr("stroke", "black");
		}
	}
	function updateChart() {

		setUpChart();

		var filterYearFromText = document.getElementById("from-year").value *1,
			filterYearToText   = document.getElementById("to-year").value *1;

		for( var i=0,z=catalogueList.length;i<z;i++) {
			var cat = catalogueList[i];
			var svg = d3.select("svg#"+cat.id);

			var selection = svg.selectAll("rect.bar")
				.data( cat.years, function(d) { return d.y; } );

			selection
				.enter()
				.append("rect")
				.classed("bar",1)
				.attr("x", function(d) { return d.y === "no year" ? 0:xScale(d.y); })
				.attr("y", function(d) { return svgHeight - (d.y === "no year" ? 0:heightScale(d.n)); })
				.attr("height", function(d) { return d.y === "no year" ? 0:heightScale(d.n); })
				.attr("width", rectWidth);

			selection
				.attr("fill",function(d,i) {
					if( d.y < filterYearFromText || d.y > filterYearToText ) {
						return "rgb(" + 200 + "," + 200 + "," + 255 + ")";
					}

					if( i % 10 > 5 ) {
						return "rgb(" + 50 + "," + 50 + "," + 255 + ")";
					}
					else {
						return "rgb(" + 100 + "," + 100 + "," + 255 + ")";
					}
				})

		}
	}

	runUpdate();

})();