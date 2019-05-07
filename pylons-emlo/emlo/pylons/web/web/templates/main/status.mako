# -*- coding: utf-8 -*-
<%!
   nav_selected = 'home'
   main_title = 'Home'
%>
<%inherit file="/base.mako" />

##===================================================================================================

<%def name="for_head()">
</%def>

##===================================================================================================

<%def name="for_foot()">
	<script src="/bower_components/foundation/js/foundation/foundation.tooltip.min.mat.js"></script>

	<script src="/sources/general/controls.js"></script>

</%def>

##===================================================================================================

<%def name="body()">


## -- EMLO intro --
	<div class="row">

		<div class="large-3 columns"><!-- dummy column -->&nbsp;</div>

		<div class="large-9 columns">
			<br/>
			<h1>Stats and indexing</h1>
			<br/><br/><br/><br/><br/>
		</div>
	</div>

## -- end of intro --

##===================================================================================================

<div class="panel" style=""><!-- just to add grey background with full width of grid -->
	<div class="row ">

		<h2 style="margin-left:15px">Index</h2>
		<p>System last indexed at ${c.indexedTime}</p>
	</div><!-- row -->
</div><!-- grey back panel -->

<div class="panel" style=""><!-- just to add grey background with full width of grid -->
	<div class="row ">

		<h2 style="margin-left:15px">Updated</h2>
		<p>Some works with recent changes:</p>
		<ul>
			% for changed in c.changedLast :
				<li>${changed['changed']} : <a href="${changed['url']}">${changed['description']}</a></li>
			% endfor
		</ul>

	</div><!-- row -->
</div><!-- grey back panel -->
##}

## -- Search --
<div class="panel" style=""><!-- just to add grey background with full width of grid -->
	<div class="row ">

		<h2 style="margin-left:15px">Raw Stats</h2>
		<p>No adjustments. e.g. count all people, even if no letters; count all images, even if bodleian cards.</p>
		<ul>
			% for stat in c.stats :
				<li>${stat} : ${c.stats[stat]}</li>
			% endfor
		</ul>

	</div><!-- row -->
</div><!-- grey back panel -->
## -- Search --
</%def>
##===================================================================================================
