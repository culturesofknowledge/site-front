# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['manifestation']
   
   main_title = 'Manifestation'
%>

<%inherit file="/main/profile.mako" />

##---------------------------------------------------------------------------------------------

<%def name="for_head()"></%def>

<%def name="for_foot()"></%def>

##---------------------------------------------------------------------------------------------

<%def name="profileRight()">
  <%
  shelfmark_fieldname = h.get_shelfmark_fieldname()
  relations_to_image_fieldname = h.get_relations_to_image_fieldname()
  document_type_fieldname = h.get_manifestation_type_fieldname()
  %>

  <dl  style="margin-top:25px;">


  </dl>

</%def>

<%def name="profile()">
	<%
		shelfmark_fieldname = h.get_shelfmark_fieldname()
		relations_to_image_fieldname = h.get_relations_to_image_fieldname()
		document_type_fieldname = h.get_manifestation_type_fieldname()
	%>

	<div id="details">

		% if c.profile.has_key( document_type_fieldname ):
			<div class="column profilepart">
				<h3><img src="/img/icon-quill.png"/>Document type</h3>
				<div class="content">
					${c.profile[ document_type_fieldname ]}
					<br/><br/>
				</div>
			</div>
		% endif


		% if c.profile.has_key( shelfmark_fieldname ):
			<div class="column profilepart">
				<h3><img src="/img/icon-related-resources.png"/>Shelfmark</h3>
				<div class="content">
					<%
						shelfmark = c.profile.get( shelfmark_fieldname, '')

						# Strip this prefix off.
						shelfmark_value_prefix = h.get_shelfmark_value_prefix()
						if shelfmark.startswith( shelfmark_value_prefix ):
							shelfmark = shelfmark.replace( shelfmark_value_prefix, '', 1 )
					%>
					${shelfmark}
					<br/><br/>
				</div>
			</div>
		% endif


		% if relations_to_image_fieldname in c.profile and len( c.profile [ relations_to_image_fieldname ] ) > 0:
			<div class="column profilepart">
				<h3><img src="/img/icon-related-resources.png"/>Images</h3>
				<div class="content">
                    ${self.image_relations( relations_to_image_fieldname )}
					<br/>
                </div>
			</div>
		% endif

		${self.h4_relations_list( h.get_repository_fieldname(), title="Repository", icon="/img/icon-repository.png")}
		${self.h4_section( h.get_printed_edition_details_fieldname() )}
		${self.h4_relations_list( h.get_relations_to_work_fieldname(), icon="/img/icon-quill.png" )}
		${self.h4_relations_list( h.get_enclosing_fieldname(), icon="/img/icon-quill.png" )}
		${self.h4_relations_list( h.get_enclosed_fieldname(), icon="/img/icon-quill.png" )}
		${self.h4_section( h.get_non_letter_enclosures_fieldname() )}
		${self.h4_section( h.get_manifestation_address_fieldname() )}
		${self.h4_section( h.get_seal_fieldname() )}
		${self.h4_section( h.get_postage_mark_fieldname() )}
		${self.h4_section( h.get_endorsements_fieldname() )}
		${self.h4_section( h.get_paper_size_fieldname() )}
		${self.h4_section( h.get_paper_type_fieldname() )}
		${self.h4_section( h.get_number_of_pages_of_document_fieldname() )}
		${self.h4_section( h.get_number_of_pages_of_text_fieldname() )}
		${self.h4_section( h.get_language_fieldname() )}
		${self.h4_section( h.get_incipit_fieldname() )}
		${self.h4_section( h.get_excipit_fieldname() )}

		<%
			range = False

			months = ['January', 'February', 'March','April','May','June',
						'July','August','September','October','November','December','' ]

			year  = c.profile.get( h.get_creation_date_year_fieldname(),  '' )
			month = c.profile.get( h.get_creation_date_month_fieldname(), 13 )
			day   = c.profile.get( h.get_creation_date_day_fieldname(),   '' )

			date = "%s %s %s" % (day, months[month-1], year)
		%>

		% if date.strip() :
			<div class="column profilepart">
				<h3><img src="/img/icon-calendar.png"/>Date of creation</h3>
				<div class="content">
					% if h.get_original_calendar_fieldname() in c.profile :
						${c.profile[ h.get_original_calendar_fieldname() ]}:
					% endif

					${date}
					<%
					flags_decoded = self.decode_uncertainty_flags( h.get_creation_date_flags_fieldname_root() )
					%>
					${flags_decoded}
				</div>
			</div>
		% endif

  </div>
</%def>

##---------------------------------------------------------------------------------------------

<%def name="body()"></%def>

##---------------------------------------------------------------------------------------------
