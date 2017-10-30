# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['institution']
   
   main_title = 'Repository'
%>

<%inherit file="/main/profile.mako" />

##--------------------------------------------------------------------------------------

<%def name="for_head()"></%def>

<%def name="for_foot()"></%def>

##--------------------------------------------------------------------------------------

<%def name="profileRight()">

  <dl>
    <!-- Short stuff here -->
  </dl>

</%def>

<%def name="profile()">

  <%
  repository_name_fieldname = h.get_repository_name_fieldname()
  repository_city_fieldname = h.get_repository_city_fieldname()
  repository_country_fieldname = h.get_repository_country_fieldname()

  repository_alternate_name_fieldname = h.get_repository_alternate_name_fieldname()
  repository_alternate_city_fieldname = h.get_repository_alternate_city_fieldname()
  repository_alternate_country_fieldname = h.get_repository_alternate_country_fieldname()

  repository_contents_fieldname = h.get_repository_contents_fieldname()
  works_in_repository_fieldname = h.get_relations_to_work_fieldname()

  total_docs_fieldname = h.get_total_docs_in_repos_fieldname()
  %>


	<div id="details">

    		% if repository_alternate_name_fieldname in c.profile :
			<div class="column profilepart">
    				<h3><img src="/img/icon-repository.png"/>Alternative names</h3>
				<div class="content">
					${c.profile[ repository_alternate_name_fieldname ]}
				</div>
			</div>
		% endif

		% if repository_city_fieldname in c.profile or repository_country_fieldname in c.profile :
			<div class="column profilepart">
				<h3><img src="/img/icon-globe.png">Location</h3>

				<div class="content">
					% if repository_city_fieldname in c.profile :
						City: ${c.profile[ repository_city_fieldname ]}
						% if repository_alternate_city_fieldname in c.profile :
							(${c.profile[ repository_alternate_city_fieldname ]})
						% endif
					%endif
					<br/>
					% if repository_country_fieldname in c.profile :
						Country: ${c.profile[ repository_country_fieldname ]}
						% if repository_alternate_country_fieldname in c.profile :
							(${c.profile[ repository_alternate_country_fieldname ]})
						% endif
					%endif
      				</div>
				<br/>
			</div>
		% endif

		% if repository_contents_fieldname in c.profile :

			<div class="column profilepart">
				<h3><img src="/img/icon-quill.png">Contents</h3>

				<div class="content">
					${c.profile["ox_totalDocsInRepository"]} records
					% if c.profile["profile_too_big"]:

					<%
						search_term = h.minimal_urlencode( c.profile[ repository_name_fieldname ] )
						if "'" in search_term:
							search_term = search_term.replace( "'", "\'" )

						search_href = '/forms/advanced?repository=' + search_term
					%>
						<br/><br/>
						Too many manifestations to show here, see results per page:

						<br/><br/><a class="headerbutton button tiny" href="${search_href}">
							Show contents</a>
					% else :
						${self.works_list( repository_contents_fieldname )}
                    % endif
					<br/>
				</div>
			</div>

    		% endif
    
	</div>
</%def>

##--------------------------------------------------------------------------------------

<%def name="body()"></%def>

##--------------------------------------------------------------------------------------
