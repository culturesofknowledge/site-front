# -*- coding: utf-8 -*-
<%!
	nav_selected = ''
	main_title = 'Chronology'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
	<style>
		th { background-color: #bbb; text-align:center !important; cursor: pointer; }
		th#chart { cursor: auto}

		th:first-child {width: 300px;}
		th, td { padding: 8px 14px;}
		/*th.center, td.center { text-align: center; }*/
		/*th.num,*/ td.num { text-align: right; }

		.all { font-weight: bold; background-color: #dadada }

		label {width: 29px;display:inline-block;}
		button {height: 22px; padding: 2px; margin-top: 0;}

		.bar { stroke-width:0 }
	</style>
</%def>

<%def name="for_foot()">
	<script src="/js/d3.v3.min.js"></script>
	<script src="/js/catalogues.js"></script>
	<script src="/js/catalogue-blog.js"></script>
	<script src="/js/cataloguesTable.js"></script>
</%def>

<%def name="body()">

	<div class="row">
		<div class="columns small-12 large-3 side" style="border:0;margin-top:0px;">

			<!-- <h2>Navigate</h2>
			  <ul class="side-nav">
				  <li><a href="#context">Context</a></li
			  </ul>-->

		</div>

		<div class="columns small-12 large-9">
			<br/>
			<div class="row">
				<div class="column">
					<h2 id="about">Chronology</h2>
					<p>Explore our catalogues by years.</p>
					<br/><br/><br/><br/>
				</div>
			</div>
		</div> <!-- large-9 columns -->
	</div><!-- row -->


	<div class="row">
		<div class="columns small-12 large-12">

			<label style="width:90px" for="catalogue-name">Filter Name</label>
			<input style="width:200px;display:inline-block" type="text" id="catalogue-name"/>

			<label style="margin-left:20px;width:90px" for="from-year">Filter Years</label>
			<input id="from-year" title="From year" style="display:inline-block;width:98px" type="number"/>
			<input id="to-year" title="To year" style="display:inline-block;width:98px" type="number"/>
			<button id="reset" style="padding: 8px 16px;height:initial">Reset years</button>

			<table id="cat"></table>
		</div>
	</div>

</%def>
