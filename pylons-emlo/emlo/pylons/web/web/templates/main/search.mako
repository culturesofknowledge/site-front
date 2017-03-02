# -*- coding: utf-8 -*-
<%!
   nav_selected = 'search'
   main_title = 'Advanced Search'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
		<style>
			@media only screen and (min-width: 64.063em) {  /* min-width 1025px, large screens */
				.side {
					position: fixed;
					width: 250px; /* Not sure why is needed...*/
				}
			}

			form .button {
				float: right;
			}

			.section {
				border-top: 1px solid #EFC319; /* Yellow */
			}
			.section h3 {
				padding: 10px 0 10px 0;
			}
			.section:last-child {
				border-bottom: 1px solid #EFC319; /* Yellow */
				margin-bottom: 40px;
			}

			fieldset {
				border: 2px solid #eee;
				margin-left: 38px;
			}
			fieldset.alignment { /* For alignment, no need to show it */
				border: 0;
				padding-top: 0;
			}
			fieldset > legend {
				color: #444;
			}

			input[type=checkbox] > label {
			    display: inline-block;
			    cursor: pointer;
			    position: relative;
			    padding-left: 25px;
			    margin-right: 15px;
			    font-size: 13px;
			}

			input[type=checkbox] {
			    display: none;
			}

			input[type=checkbox] label::before {
			    border-radius: 3px;
						content: " ";
			display: table;
			}

			input[type=checkbox]:checked {
			    content: "\2713";
			    text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
			    font-size: 15px;
			    color: #f3f3f3;
			    text-align: center;
			    line-height: 15px;
			}


			/* Start checkbox (from: http://codepen.io/CreativeJuiz/pen/BiHzp ) */

			/* Base for label styling */
			[type="checkbox"]:not(:checked),
			[type="checkbox"]:checked {
			  position: absolute;
			  left: -9999px;
			}
			[type="checkbox"]:not(:checked) + label,
			[type="checkbox"]:checked + label {
			  position: relative;
			  padding-left: 25px;
			  cursor: pointer;
			}

			/* checkbox aspect */
			[type="checkbox"]:not(:checked) + label:before,
			[type="checkbox"]:checked + label:before {
			  content: '';
			  position: absolute;
			  left:0; top: 2px;
			  width: 20px; height: 20px;
			  border: 2px solid #EFC319;
			  background: #f8f8f8;
			  border-radius: 3px;
			  box-shadow: inset 0 1px 3px rgba(0,0,0,.3)
			}
			/* checked mark aspect */
			[type="checkbox"]:not(:checked) + label:after,
			[type="checkbox"]:checked + label:after {
			  content: '✔';
			  position: absolute;
			  top: 0; left: 4px;
			  font-size: 14px;
			  color: #09ad7e;
			  transition: all .2s;
			}
			/* checked mark aspect changes */
			[type="checkbox"]:not(:checked) + label:after {
			  opacity: 0;
			  transform: scale(0);
			}
			[type="checkbox"]:checked + label:after {
			  opacity: 1;
			  transform: scale(1);
			}
			/* disabled checkbox */
			[type="checkbox"]:disabled:not(:checked) + label:before,
			[type="checkbox"]:disabled:checked + label:before {
			  box-shadow: none;
			  border-color: #bbb;
			  background-color: #ddd;
			}
			[type="checkbox"]:disabled:checked + label:after {
			  color: #999;
			}
			[type="checkbox"]:disabled + label {
			  color: #aaa;
			}
			/* accessibility */
			[type="checkbox"]:checked:focus + label:before,
			[type="checkbox"]:not(:checked):focus + label:before {
			  border: 1px dotted blue;
			}

			/* hover style just for information */
			label:hover:before {
			  border: 2px solid #888!important;
			}

			/* End checkbox */
		</style>
</%def>

##------------------------------------------------------------------------------------------

<%def name="for_foot()">

	<script src="/bower_components/foundation/js/foundation/foundation.tooltip.min.mat.js"></script>
	<script src="/sources/general/controls.js"></script>

	<script>
		bdlss.emlo.foundationSettings["tooltip"] = {

			tip_template : function (selector, content) {

				return '<span data-selector="' + selector + '" class="'
					+ Foundation.libs.tooltip.settings.tooltip_class.substring(1)
					+ '">' + content + '<span class="nub"></span></span>';
			}
		};
	</script>

	<script>
		function sticky_relocate() {
				var window_top = $(window).scrollTop();
				var div_top = $('.side-nav-anchor').offset().top;
				if (window_top > div_top) {
						$('.side-nav').addClass('stick');
				} else {
						$('.side-nav').removeClass('stick');
				}
		}

		$(document).foundation( bdlss.emlo.foundationSettings );

		$(function() {
			var stickOn = false;
			if( Foundation.utils.is_large_up() ) {
				
				$(window).scroll(sticky_relocate);
				$('.side').css("position", "initial");
				sticky_relocate();
				stickOn = true;
			}

			$( window ).resize( function() {
				if( Foundation.utils.is_large_up() ) {
					if( !stickOn ) {
						//$('.side').css("position", "initial");
						$(window).scroll(sticky_relocate);
						sticky_relocate();
						stickOn = true;
					}
				}
				else {
					if( stickOn ) {
						$(window).off( "scroll" );
						$('.side-nav').removeClass('stick');
						stickOn = false;
					}
				}
			});
		});
	</script>

	<style>
	.side-nav.stick {
			margin-top: 0 !important;
			position: fixed;
			top: 0;
			z-index: 10000;
			border-radius: 0 0 0.5em 0.5em;
	}
	</style>

	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
	<style>
	.select2-container {
			margin: 0 0 15px 0;
	}

	.select2-container--default .select2-selection--single {
			border: 2px solid #EFC319
	}
	.select2-container--default .select2-selection--single .select2-selection__arrow {
			background-color: #dedcdc;
	}
	</style>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>
	<script type="text/javascript">
		$('#dates_section select,#let_lang,#repository,#col_cat').select2();
	</script>

</%def>

##------------------------------------------------------------------------------------------

<%def name="body()">
##{
	<%
		form_sections = [
				( "people_section",       "People" ),
				( "dates_section",        "Dates" ),
				( "places_section",       "Places" ),
				( "letters_section",      "Content" ),
				( "institutions_section", "Repositories and Editions" ),
				( "collections_section",  "Catalogues" )
		]
	%>

	<div class="row">

##===============================================

		<div class="small-12 large-3 columns side">

			<p>Jump To:</p>
			<div class="side-nav-anchor"></div>
			<ul class="side-nav">
				% for anchor_name, section_title in form_sections:
				<li><a href="#${anchor_name}">${section_title}</a></li>
				% endfor

			<li><form onsubmit="return false;" style="width:200px"><input class="button submit search-related" value="Search" onclick="$('form#search').submit();" style="margin-top:10px;margin-right:45px;" type="submit"></form></li>
			</ul>

		</div> 

##===============================================

		<div class="small-12 large-9 columns main">

			<div class="row">
				<div class="column small-12"><br>
					<h2 class="main">Search+</h2>
				</div>
			</div>

##====================== "Search works" form ======================

			<form id="search" action="forms/">
				<input type="hidden" id="search_type" name="search_type" value="advanced"/>

########## Start 'People' section ###########

				<div class="section clearfix" id="people_section">

					<h3><img src="/img/icon-people.png" alt="People Icon">People</h3>

					<fieldset>

						<legend>All people</legend>

						<%
							fieldname = 'people'
							help = "Search letters for authors, senders, recipients, and people mentioned, e.g. 'Samuel Hartlib', 'John Aubrey', or 'The Royal Society'. Search is not case sensitive. "
						%>
						<label for="${fieldname}">Name</label>
						<div class="row">
							<div class="small-11 columns">
								${self.normal_text_input_field( fieldname, help )}
							</div>
							<div class="small-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

						<div class="row">

							<div class="columns small-12 large-3">
								<%
									fieldname = 'people_gend'
								%>
								<label for="${fieldname}">Gender</label>
								<div class="row">
									<div class="large-9 columns">
										${self.start_normal_select( fieldname )} ${self.gender_options()} ${self.end_normal_select( fieldname )}
									</div>
									<div class="large-3 columns">
										${self.context_help( "Confine your search to male or female authors, senders, recipients, and people mentioned." )}
									</div>
								</div>
							</div>

							<div class="columns small-12 large-5 end">
								<%
									fieldname = 'agent_org'
								%>
								<label>&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-10 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only Organizations</label>
									</div>
									<div class="large-2 columns">
										${self.context_help( "Confine your search to instances where the author, sender, recipient was an organization or corporate entity, e.g. The Royal Society." )}
									</div>
								</div>
							</div>
						</div>

						<%
							fieldname = 'people_roles'
							help = "Search for people by title, role, or occupation, e.g. 'Bookseller' or 'Politician'. Search is not case sensitive. "
						%>
						<label for="${fieldname}">Titles, roles, or occupations</label>
						<div class="row">
							<div class="large-11 columns">
								${self.normal_text_input_field( fieldname, help )}
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>
					</fieldset>

					##xxxxxxxxxxxx End 'All people' fieldset


					##xxxxxxxxxxxx Start Author/Sender fieldset
					<fieldset>
						<legend>Senders</legend>

						<%
							fieldname = 'aut'
							help = "Search for authors and senders, e.g. 'Samuel Hartlib', 'John Aubrey', or 'The Royal Society'. Search is not case sensitive. "
						%>
						<label for="${fieldname}" >Name</label>
						<div class="row">
							<div class="small-11 columns">
								${self.normal_text_input_field( fieldname )}
							</div>
							<div class="small-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

						<div class="row">

							<div class="columns small-12 large-3">
								<%
									fieldname = 'aut_gend'
								%>
								<label for="${fieldname}" >Gender</label>
								<div class="row">
									<div class="large-9 columns">
										${self.start_normal_select( fieldname )}
										${self.gender_options()}
										${self.end_normal_select( fieldname )}
									</div>
									<div class="large-3 columns">
										${self.context_help( "Confine your search to male or female authors or senders." )}
									</div>
								</div>
							</div>


							<div class="columns small-12 large-5">
								<%
									fieldname = 'aut_org'
									help = "Confine your search to instances where the author, sender, recipient was an organization or corporate entity, e.g. The Royal Society. "
								%>
								<label >&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-10 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only Organizations</label>
									</div>
									<div class="large-2 columns">
										${self.context_help(help, with_gap = False, calling_field = fieldname)}
									</div>
								</div>
							</div>

							<div class="columns small-12 large-4">
								<%
									fieldname = 'aut_mark'
								%>
								<label>&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-9 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >As marked</label>
									</div>
									<div class="large-3 columns">
										${self.context_help( "Search authors' and senders' personal names exactly as they were expressed in the original letters.")}
									</div>
								</div>
							</div>
						</div>

						<%
						fieldname = 'aut_roles'
						help = "Search for authors and senders by title, role, or occupation, e.g. 'Bookseller' or 'Politician'. Search is not case sensitive. "
						%>
						<label for="${fieldname}">Titles, roles, or occupations</label>
						<div class="row">
							<div class="large-11 columns">
								${self.normal_text_input_field( fieldname, help )}
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>


					</fieldset>

					##xxxxxxxxxxxx End Author/Sender fieldset


					##xxxxxxxxxxxx Start Recipient fieldset
					<fieldset>
						<legend>Recipients</legend>

						<%
							fieldname = 'rec'
							help = "Search for recipients, e.g. 'Samuel Hartlib', 'John Aubrey', or 'The Royal Society'. Search is not case sensitive. "
						%>
						<label for="${fieldname}" >Name</label>
						<div class="row">
							<div class="small-11 columns">
								${self.normal_text_input_field( fieldname )}
							</div>
							<div class="small-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

						<div class="row">

							<div class="columns small-12 large-3">
								<% fieldname = 'rec_gend' %>
								<label for="${fieldname}" >Gender</label>
								<div class="row">
									<div class="large-9 columns">
										${self.start_normal_select( fieldname )}
										${self.gender_options()}
										${self.end_normal_select( fieldname )}
									</div>

									<div class="large-3 columns">
										${self.context_help( "Confine your search to male or female recipients." )}
									</div>
								</div>
							</div>

							<div class="columns small-12 large-5">
								<%
								fieldname = 'rec_org'
								help = "Confine your search to instances where the recipient was an organization or corporate entity. e.g. The Royal Society. "
								%>
								<label>&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-10 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only Organizations</label>
									</div>
									<div class="large-2 columns">
										${self.context_help(help, with_gap = False, calling_field = fieldname)}
									</div>
								</div>
							</div>

							<div class="columns small-12 large-4">
								<% fieldname = 'rec_mark' %>
								<label>&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-9 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >As marked</label>
									</div>
									<div class="large-3 columns">
										${self.context_help( "Search recipients' personal names exactly as they were expressed in the original letters" )}
									</div>
								</div>
							</div>

						</div>

						<%
						fieldname = 'rec_roles'
						help = "Search for recipients by title, role, or occupation, e.g. 'Bookseller' or 'Politician'. Search is not case sensitive. "
						%>
						<label for="${fieldname}" >Titles, roles, or occupations</label>
						<div class="row">
							<div class="large-11 columns">
								${self.normal_text_input_field( fieldname, help )}
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

					</fieldset>

					##xxxxxxxxxxxx End Recipient fieldset

					##xxxxxxxxxxxx Start People mentioned fieldset
					<fieldset>
						<legend>People Mentioned</legend>

						<%
						fieldname = 'ment'
						help = "Search for people or organizations mentioned in letters, e.g. 'Samuel Hartlib', 'John Aubrey', or 'The Royal Society'. Search is not case sensitive. "
						%>
						<label  for="${fieldname}" >Name</label>
						<div class="row">
							<div class="small-11 columns">
								${self.normal_text_input_field( fieldname )}
							</div>
							<div class="small-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

						<div class="row">

							<div class="columns small-12 large-3">
								<% fieldname = 'ment_gend' %>
								<label for="${fieldname}" >Gender</label>
								<div class="row">
									<div class="large-9 columns">
										${self.start_normal_select( fieldname )} ${self.gender_options()} ${self.end_normal_select( fieldname )}
									</div>
									<div class="large-3 columns">
										${self.context_help( "Confine your search to male or female people mentioned in letters." )}
									</div>
								</div>
							</div>

							<div class="columns small-12 large-5 end">
								<%
								fieldname = 'ment_org'
								help = "Confine your search to instances where the person mentioned was an organization or corporate entity, e.g. The Royal Society. "
								%>
								<label>&nbsp;<!-- for alignment--></label>
								<div class="row">
									<div class="large-10 columns">
										${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only Organizations</label>
									</div>
									<div class="large-2 columns">
										${self.context_help(help, with_gap = False, calling_field = fieldname)}
									</div>
								</div>
							</div>

						</div>

						<%
						fieldname = 'ment_roles'
						help = "Search for people mentioned in letters by title, role, or occupation, e.g. 'Bookseller' or 'Politician'. Search is not case sensitive. "
						%>
						<label for="${fieldname}" >Titles, roles, or occupations</label>
						<div class="row">
							<div class="large-11 columns">
								${self.normal_text_input_field( fieldname, help )}
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>


					</fieldset>
					##xxxxxxxxxxxx End People Mentioned fieldset

					${self.extra_submit_search_button()}
                </div>



 ############## Start 'Dates section
				<div class="section clearfix" id="dates_section">

					<h3><img src="/img/icon-calendar.png" alt="Dates Icon">Dates</h3>

					<fieldset class="alignment">
					<label>Single Date</label>
		                <div class="row">
			                <%
			                    help = "Search within a single year, month, day or a combination of all three. "
			                %>
			                <div class="columns small-12 large-3">
				                <% fieldname = 'dat_sin_year' %>
				                ${self.start_normal_select( fieldname )} ${self.year_options()} ${self.end_normal_select( fieldname )}
			                </div>
			                <div class="columns small-12 large-4">
				                <% fieldname = 'dat_sin_month' %>
				                ${self.start_normal_select( fieldname )} ${self.month_options()}  ${self.end_normal_select( fieldname )}
			                </div>
			                <div class="columns small-12 large-3">
				                <% fieldname = 'dat_sin_day' %>
				                ${self.start_normal_select( fieldname )} ${self.day_options()}  ${self.end_normal_select( fieldname )}
			                </div>
			                <div class="columns small-12 large-2">
				                ${self.context_help(help, with_gap = False, calling_field = fieldname)}
			                </div>
		                </div>
					</fieldset>

					<fieldset>

						<legend>Between</legend>

						<label>From</label>
						<div class="row">
							<%
							help = "Search from this year, month, day or combination of all three. "
							%>
							<div class="columns small-12 large-3">
								<% fieldname = 'dat_from_year' %>
								${self.start_normal_select( fieldname )}${self.year_options( add_unknown_year = True )}${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-4">
								<% fieldname = 'dat_from_month' %>
								${self.start_normal_select( fieldname )}${self.month_options()}${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-3">
								<% fieldname = 'dat_from_day' %>
								${self.start_normal_select( fieldname )}${self.day_options()}${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-2">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>

						<label>To</label>
						<div class="row">
							<%
							help = "Search from this year, month, day or combination of all three.  "
							%>
							<div class="columns small-12 large-3">
								<% fieldname = 'dat_to_year' %>
								${self.start_normal_select( fieldname )} ${self.year_options( add_unknown_year = True )} ${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-4">
								<% fieldname = 'dat_to_month' %>
								${self.start_normal_select( fieldname )} ${self.month_options()} ${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-3">
								<% fieldname = 'dat_to_day' %>
								${self.start_normal_select( fieldname )} ${self.day_options()} ${self.end_normal_select( fieldname )}
							</div>
							<div class="columns small-12 large-2">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>
					</fieldset>
                     ${self.extra_submit_search_button()}

            </div>


############## Start 'Places' section

				<div class="section clearfix" id="places_section">
				<h3><img src="/img/icon-globe.png" alt="Places Icon">Places</h3>

				<fieldset>
					<legend>All places</legend>

	                <%
	                    fieldname = 'locations'
	                    help = "Search the places that letters were sent from or to, e.g. 'Queen's College', 'Paris', or 'Spain'. Search is not case sensitive. "
	                %>
	                <label for="${fieldname}" >Name</label>
					<div class="row">
						<div class="small-11 columns">
	                        ${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
	                        ${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Origin</legend>

					<%
					fieldname = 'pla_ori_name'
					help = "Search the places that letters were sent from, e.g. 'Queen's College', 'Paris', or 'Spain'. Search is not case sensitive. "
					%>
					<label for="${fieldname}" >Name</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>

					<% fieldname = 'pla_ori_mark' %>
					<div class="row">
						<div class="small-4 columns">
							${self.normal_checkbox( fieldname )}<label for="${fieldname}" >As marked</label>
						</div>
						<div class="small-1 columns end">
							${self.context_help( "Search place names exactly as they were expressed in the original letters." )}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Destination</legend>
					<%
					fieldname = 'pla_des_name'
					help = "Search the places that letters were sent to, e.g. 'Queen's College', 'Paris', or 'Spain'. Search is not case sensitive. "
					%>
					<label for="${fieldname}" >Name</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}	</div>
					</div>

					<% fieldname = 'pla_des_mark' %>
					<div class="row">
						<div class="small-4 columns">
							${self.normal_checkbox( fieldname )}<label for="${fieldname}" >As marked</label>
						</div>
						<div class="small-1 columns end">
							${self.context_help( "Search place names exactly as they were expressed in the original letters." )}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Places mentioned</legend>
					<%
					fieldname = 'pla_ment_name'
					help = "Search for places mentioned, e.g. 'Queen's College', 'Paris', or 'Spain'. Search is not case sensitive. "
					%>
					<label for="${fieldname}" >Name</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>
				</fieldset>

			${self.extra_submit_search_button()}
			</div>



############# Start 'Letters' section
				<div class="section clearfix" id="letters_section">

				<h3><img src="/img/icon-quill.png" alt="Content Icon">Content</h3>

				<fieldset>
					<legend>Content</legend>

					<%
					fieldname = 'let_con'
					help = "Search across abstracts, keywords, incipits, excipits, transcriptions, and enclosures, e.g. 'Spider' or 'Mathematics'. "
					%>
					<label for="${fieldname}" >Search Content</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>


					<% fieldname = 'let_type' %>
					<label for="${fieldname}" >Document type</label>
					<div class="row">
						<div class="small-11 columns">
							${self.start_normal_select( fieldname )} ${self.document_type_options()} ${self.end_normal_select( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Confine your search to a particular document type." )}
						</div>
					</div>

					<% fieldname = 'let_lang' %>
					<label for="${fieldname}" >Language</label>
					<div class="row">
						<div class="small-11 columns">
							${self.start_normal_select( fieldname )} ${self.language_options()} ${self.end_normal_select( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Confine your search to letters in a particular language.", with_gap = True )}
						</div>
					</div>

					<div class="row">
						<div class="columns small-12 large-4">
							<% fieldname = 'let_ima' %>
							<label >Only with</label>
							<div class="row">
								<div class="small-9 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Images</label>
								</div>
								<div class="small-3 columns">
									${self.context_help( "Confine your search to letters for which we have images." )}
								</div>
							</div>
						</div>


						<div class="columns small-12 large-4">
							<% fieldname = 'let_abst' %>
							<label>Only with</label>
							<div class="row">
								<div class="small-9 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Abstracts</label>
								</div>
								<div class="small-3 columns">
									${self.context_help( "Confine your search to letters for which we have abstracts." )}
								</div>
							</div>
						</div>

						<div class="columns small-12 large-4">
							<% fieldname = 'let_trans' %>
							<label>Only with</label>
							<div class="row">
								<div class="small-9 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Transcriptions</label>
								</div>
								<div class="small-3 columns">
									${self.context_help( "Confine your search to letters for which we have full-text transcriptions." )}
								</div>
							</div>
						</div>
					</div>

				</fieldset>


				<fieldset>
					<legend>Postage Marks</legend>


					<% fieldname = 'let_pmark_tex' %>
					<label for="${fieldname}" >Search postage mark</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search for specific types of postage marks, or for particular representations within postage marks, e.g. 'Bishop Mark'. Search is not case sensitive." )}

						</div>
					</div>

					<% fieldname = 'let_pmark' %>

					<div class="row">
						<div class="small-6 columns end">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with postage marks</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about postage marks." )}
								</div>
							</div>
						</div>
					</div>

				</fieldset>

				<fieldset>
					<legend>Endorsements</legend>

					<% fieldname = 'let_end_tex' %>
					<label for="${fieldname}" >Search endorsement</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search across information on endorsements and annotations in a contemporary hand, e.g. 'Different Hand', 'Top Right', or 'Left Margin'. Search is not case sensitive." )}
						</div>
					</div>

					<% fieldname = 'let_end' %>
					<div class="row">
						<div class="small-6 columns end">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with endorsements</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about endorsements and annotations in a contemporary hand" )}
								</div>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Enclosures</legend>

					<% fieldname = 'let_with_en_tex' %>
					<label for="${fieldname}" >Search enclosures</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search for specific enclosed items, e.g. 'Letter'. Search is not case sensitive." )}
						</div>
					</div>


					<% fieldname = 'let_with_en' %>
					<div class="row">
						<div class="small-12 large-6 columns">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with enclosures</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters that were sent with an enclosed item.", with_gap = True )}
								</div>
							</div>
						</div>

						<% fieldname = 'let_en' %>

						<div class="small-12 large-6 columns">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only enclosed</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters that were themselves enclosed with another letter." )}
								</div>
							</div>
						</div>
					</div>
				</fieldset>


				<fieldset>
					<legend>Seals</legend>

					<% fieldname = 'let_seal_tex' %>
					<label for="${fieldname}" >Search seals</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search for specific types of seal, or for particular representations within seals, e.g. 'Flower', 'Unity of Brethren', or 'Oval'. Search is not case sensitive." )}
						</div>
					</div>

					<% fieldname = 'let_seal' %>
					<div class="row">
						<div class="small-6 columns end">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with seals</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about seals." )}
								</div>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Paper</legend>

					<% fieldname = 'let_pap_typ_tex' %>
					<label for="${fieldname}" >Paper type</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search for specific paper types and watermarks, e.g. 'Pearl', 'Crown', or 'Bird'. Search is not case sensitive." )}
						</div>
					</div>

					<% fieldname = 'let_pap_typ' %>
					<div class="row">
						<div class="small-6 columns end">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with paper type</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about paper type or watermark." )}
								</div>
							</div>
						</div>
					</div>


					<% help = "Search for specific paper sizes, e.g. '209x160'. " %>

					<% fieldname = 'let_pap_siz_tex' %>
					<label for="${fieldname}" >Paper Sizes</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>


					<div class="row">
						<div class="small-6 columns end">
							<% fieldname = 'let_pap_siz' %>
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with paper sizes</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about paper size." )}
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="small-6 columns">
							<% fieldname = 'let_page' %>
							<label>Page count</label>
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with page count</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters for which we have information about the number of pages." )}
								</div>
							</div>
						</div>

						<div class="small-4 columns end">
							<% fieldname = 'let_page_min' %>
							<label for="${fieldname}" >Minimum number of pages</label>
							<div class="row">
								<div class="small-9 columns">
									${self.start_normal_select( fieldname, css_class="numbers" )} ${self.page_count_options()} ${self.end_normal_select( fieldname )}
								</div>
								<div class="small-3 columns">
									${self.context_help( "Confine your search to letters above a certain number of pages." )}
								</div>
							</div>
						</div>

					</div>

				</fieldset>

			${self.extra_submit_search_button()}
			</div>

############ Start 'Repositories' section

				<div class="section clearfix" id="institutions_section">
				<h3><img src="/img/icon-repository.png"  alt="Repositories and Editions Icon">Repositories and Editions</h3>

				<fieldset>
					<legend>Repositories</legend>

					<%
					fieldname = 'repository'
					help = "Confine your search to a particular library or archive. "
					%>
					<label for="${fieldname}" >Repository</label>
					<div class="row">
						<div class="small-11 columns">
							${self.start_normal_select( fieldname )}
							${self.repository_options()}
							${self.end_normal_select( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help(help, with_gap = False, calling_field = fieldname)}
						</div>
					</div>
					<% fieldname = 'let_shel' %>
					<label for="${fieldname}" >Shelfmark / ID</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search for letters by their shelfmark or another repository identifier, e.g. 'Tanner', 'Rawl', or 'MS Smith'. Search is not case sensitive." )}
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Printed Editions</legend>

					<% fieldname = 'let_pe_tex' %>
					<label for="${fieldname}" >Printed Editions</label>
					<div class="row">
						<div class="small-11 columns">
							${self.normal_text_input_field( fieldname )}
						</div>
						<div class="small-1 columns">
							${self.context_help( "Search across the titles of books and pamphlets in which printed versions of letters appear. Search is not case sensitive." )}
						</div>
					</div>

					<% fieldname = 'let_pe' %>
					<div class="row">
						<div class="small-6 columns end">
							<div class="row">
								<div class="small-10 columns">
									${self.normal_checkbox( fieldname )}<label for="${fieldname}" >Only with printed editions</label>
								</div>
								<div class="small-2 columns">
									${self.context_help( "Confine your search to letters that exist in printed versions." \
									+ " in printed manifestations." )}
								</div>
							</div>
						</div>
					</div>

				</fieldset>

				${self.extra_submit_search_button()}
			</div>

########## Start 'Collections' section ############

				<div class="section clearfix" id="collections_section" >
					<h3><img src="/img/icon-catalogues.png" alt="Catalogue Icon">Catalogues</h3>

					<fieldset class="alignment">
						<%
							fieldname = 'col_cat'
							help = "Confine your search to a single catalogue."
						%>
						<label for="${fieldname}" >Catalogue</label>
						<div class="row">
							<div class="large-11 columns">
								${self.start_normal_select( fieldname )}${self.catalogue_options()}${self.end_normal_select( fieldname )}
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>
					</fieldset>

					<!-- <fieldset class="alignment">
						<%
							fieldname = 'cat_group'
							help = "Search within multiple catalogues."
						%>
						<label for="${fieldname}" >Catalogue</label>
						<div class="row">
							<div class="large-11 columns">
								<select name="${fieldname}" multiple="true" height="100">
									${self.catalogue_options()}
								</select>
							</div>
							<div class="large-1 columns">
								${self.context_help(help, with_gap = False, calling_field = fieldname)}
							</div>
						</div>
					</fieldset> -->
					<% 
						cat_group = "empty"
						#if "profile" in c :
						#	cat_group = c.profile.get( 'cat_group', "" ) 
						if len( request.params ) > 0: #{
							cat_group = h.get_parm_value_from_request( request, required_parm = fieldname )
							if cat_group == "" :
								cat_group = "empty"
					%>
					<input type="hidden" name="cat_group" value="${cat_group}"/>

					${self.extra_submit_search_button()}
				</div>


          </form>


    </div><!-- class large-10 columns -->
    ##===============================================

  </div><!--class:row-->
##}
</%def>

##------------------------------------------------------------------------------------------

<%def name="horizontal_nav_within_form( form_sections )">
  <div class="floatright">
    <p class="totop">
    Jump to: 
    <a href="#top">Top</a>
    % for anchor_name, section_title in form_sections:
      | <a href="#${anchor_name}">${section_title}</a>
    % endfor

    </p>
   </div>
</%def>

##------------------------------------------------------------------------------------------

<%def name="extra_submit_search_button()">


  <input name="submit-advanced" type="submit" class="button submit search-related" value="Search" />


</%def>

##------------------------------------------------------------------------------------------
