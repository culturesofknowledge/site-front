# -*- coding: utf-8 -*-
<%!
   nav_selected = 'home'
   main_title = 'Home'
%>
<%inherit file="/base.mako" />

##===================================================================================================

<%def name="for_head()">
	<style>
		#news-output .item .title { margin:0 0 20px; color: black; text-align: center;vertical-align: middle; padding: 5px 3px; background-color: #EFC319;min-height:100px;line-height:1.5}
		#news-output .item .image { max-height:215px;overflow:hidden;display:block;background-color: #cecece; text-align: center;transition: max-height 1s;}
		#news-output .item .image:hover { max-height: 1000px; transition: max-height 1s;}
	</style>
</%def>

##===================================================================================================

<%def name="for_foot()">
	<script src="/bower_components/foundation/js/foundation/foundation.tooltip.min.mat.js"></script>

	<script src="/sources/general/controls.js"></script>
    <script src="/sources/pages/home.min.js"></script>

	<script>
		bdlss.emlo.foundationSettings["tooltip"] = {

			tip_template : function (selector, content) {

				return '<span data-selector="' + selector + '" class="'
					+ Foundation.libs.tooltip.settings.tooltip_class.substring(1)
					+ '">' + content + '<span class="nub"></span></span>';
			}
		};
	</script>

</%def>

##===================================================================================================

<%def name="body()">


## -- EMLO intro --
	<div class="row">

		<div class="large-2 columns"><!-- dummy column -->&nbsp;</div>

		<div class="large-10 columns" style="padding-left:25px">
			<br/>
			<h1>Welcome to Early Modern Letters Online</h1>

			<p>Created by the Cultures of Knowledge Project with generous funding from The Andrew W. Mellon Foundation, and now very generously funded by the Packard Humanities Institute, Early Modern Letters Online — EMLO — is a combined finding aid and editorial interface for basic descriptions of early modern correspondence. </p>

			<%
				warning = None

				if not 'people' in c.stats or not 'locations' in c.stats or not 'works' in c.stats \
					or c.stats['people']['number'] == 0 \
					or c.stats['locations']['number'] == 0 \
					or c.stats['works']['number'] == 0:
					warning = "Please note that the EMLO records are currently unavailable. They will be back online shortly. Thank you."

				#else :
				#	warning = "Please note that, due to a technical issue beyond our control, transcriptions and some images of a number of letters normally available in EMLO are not online at present. Work is underway to restore access."
			%>

			% if warning:
				<p style="font-size:smaller;color:red;margin-bottom:10px">${warning}</p>
			% else:
				<br/>
			% endif
		</div>
	</div>

## -- end of intro --

##===================================================================================================

## -- Search --
<div class="panel" style=""><!-- just to add grey background with full width of grid -->
    <div class="row ">

        ##========== Two alternative search forms come next ============
        <form id="search" action="/forms/">

            ##===============================
            <div class="large-11 small-10 columns">
              <%
              fieldname = 'people'
              help = "Search letters for authors, senders, recipients, and people mentioned, e.g. 'Samuel Hartlib', 'John Aubrey', or 'The Royal Society'. <br/><br/>Search is not case sensitive. "
              %>
              <label for="${fieldname}" >Search people</label>
              ${self.normal_text_input_field( fieldname, help )}
            </div>
            <div class="large-1 small-2 columns"><label>&nbsp;<!-- for alingment--></label>
              ${self.context_help( help, with_gap = False, calling_field = fieldname )}
            </div>

            ##===============================
            <div class="large-6 small-5 columns">
              <label>Search from year</label>
              <%
              fieldname = 'dat_from_year'
              help = "Search by individual year and across year ranges. <br/><br/>To select a single year, use the first drop-down only. "
              %>
              ${self.start_normal_select( fieldname, title='Search from this year.', css_class='year_from' )}
              ${self.year_options()}
              ${self.end_normal_select( fieldname )}
            </div>

            <div class="small-5 columns">
              <label>Search to year</label>

              <% fieldname = 'dat_to_year' %>
              ${self.start_normal_select( fieldname, title='Search up to this year.', css_class='year_to' )}
              ${self.year_options()}
              ${self.end_normal_select( fieldname )}
            </div>

            <div class="large-1 small-2 columns"><label>&nbsp;<!-- for alignment--></label>
              ${self.context_help( help, with_gap = False, calling_field = fieldname )}
            </div>

            ##===============================
            <div class="large-11 small-10 columns">
              <%
              fieldname = 'locations'
              help = "Search the places that letters were sent from or to, e.g. 'Queen's College', 'Paris', or 'Spain'. <br/><br/>Search is not case sensitive."
              %>
              <label for="${fieldname}" >Search places</label>
              ${self.normal_text_input_field( fieldname, help )}
            </div>
            <div class="large-1 small-2 columns"><label>&nbsp;<!-- for alingment--></label>
              ${self.context_help( help, with_gap = False, calling_field = fieldname )}
            </div>

            ##===============================
            <div class="large-11 small-10 columns">
              <label>Search content</label>
              <%
              fieldname = 'let_con'
              help = "Search across abstracts, keywords, incipits, excipits, transcriptions, and enclosures, e.g. 'Spider' or 'Mathematics'. <br/><br/>Search is not case sensitive. "
              %>
              ${self.normal_text_input_field( fieldname, help )}
            </div>
            <div class="large-1 small-2 columns"><label>&nbsp;<!-- for alingment--></label>
              ${self.context_help( help, with_gap = False, calling_field = fieldname )}
            </div>

            ##===============================

		    ##<div class="large-11 columns">
            ##  <label>Catalogue</label>
            ##  <%
            ##  fieldname = 'col_cat'
            ##  help = "Confine your search to a single catalogue. "
            ##  %>
            ##  ${self.start_normal_select( fieldname, title=help )}
            ##  ${self.catalogue_options()}
            ##  ${self.end_normal_select( fieldname )}
            ##</div>
            ##<div class="large-1 column"><label>&nbsp;<!-- for alingment --></label>
            ##  ${self.context_help( help, with_gap = False, calling_field = fieldname )}
            ##</div>


          <div class="large-12 columns">
            <input class="button submit search-related" type="submit" name="submit-normal" value="Search" style="margin-top:13px" />

            <input type="hidden" id="search_type" name="search_type" value="normal" />
          </div>

        </form>  <!-- End short version of form -->

          <div class="large-12 hide-for-small columns" style="margin-top:-70px">
						
            <p class="text-center" style="margin-bottom:0">Want a full set of fields? Try <a href="/advanced">Search+</a></p>
            <p class="text-center" style="">Prefer things at a glance? You can also <a href="/browse/people">Browse</a></p>
          </div>
		<div class="small-12 show-for-small columns" style="margin-top:0">

			<p class="text-center" style="margin-bottom:0">Want a full set of fields? Try <a href="/advanced">Search+</a></p>
			<p class="text-center" style="">Prefer things at a glance? You can also <a href="/browse/people">Browse</a></p>
		</div>

    </div><!-- row -->
    </div><!-- grey back panel -->






##===================================================================================================

## -- Catalogue statistics --
	<div class="row">
		<div class="large-12 columns">
			<ul class="small-block-grid-2 medium-block-grid-5 large-block-grid-10">
				% if c.stats :
           
					<%
						## stat_keys = c.stats.keys()
						## -- this put things in alpha order with 'Works' at the end -- stat_keys.sort()

						## Let's get our different object types into a logical order, not just alphabetical, partly
						## because we don't want to use the terms 'Works' and 'Manifestations' onscreen, so if we sort
						## alphabetically at this point, and then re-label, the order would look random.
						stat_keys = []
						sorted_stat_keys = [ 'people', 'locations', 'organisations', 'repositories',
											 'catalogues', 'works', 'manifestations', 'images',
											 'comments', 'related resources' ]
						for stat_key in sorted_stat_keys: #{
						  if c.stats.has_key( stat_key ): #{
							stat_keys.append( stat_key )
						  #}
						#}
					%>

            		## First list the object types that have links through to the Browse page,
            		## i.e. currently People, Locations, Organisations and Repositories.

					% for stat in stat_keys :
					<%
						data = c.stats[stat]

						desc = stat.capitalize()
						if desc == 'Works':
								desc = 'Letters'
						elif desc == 'Manifestations':
								desc = 'Versions'
						elif desc == 'Related resources':
								desc = 'Resources'

						if stat == 'catalogues' :
							stat = 'Catalogues'
					%>
						<li class="stats-text text-center">
							<img src="../img/icon-stats-${stat}.png" alt="${desc} icon" class="stats-icon"/><br/>
							${data['number']}<br/>
			                % if data.has_key('url') :
								<a href="${data['url']}"> ${stat.capitalize()}</a>
							% else:
								${desc}
							% endif
						</li>
					% endfor

          		% endif
			</ul> <!-- end block grid -->
		</div> <!-- div column -->
	</div> <!-- div row -->
    <!-- end of catalogue statistics -->

##===================================================================================================

    <!-- news section (updated via javascript from wordpress site)-->
	<div id="news-output"  class="panel" style="display:none"> <!-- this panel is just to give the grey background for the entire row even outside grid -->
		<div class="row">

			<h2 style="margin-left:15px;">Featured catalogues</h2>

			<!--div class="row"-->
				<div class="item large-4 medium-4 small-12 columns">
						<a class="link" >
							<div class="image"></div>
							<h3 class="title">Title of News</h3>
						</a>
				</div>

				<div class="item large-4 medium-4 small-12 columns">
						<a class="link" >
							<div class="image"></div>
							<h3 class="title">Title of News</h3>
						</a>
				</div>

				<div class="item large-4 medium-4 small-12 columns">
						<a class="link" >
							<div class="image"></div>
							<h3 class="title">Title of News</h3>
						</a>
				</div>
			</div>

		</div><!-- end row -->

	</div><!-- end panel -->
    

##}


##}
</%def>
##===================================================================================================
