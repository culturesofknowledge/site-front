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

  ## Check for excessively large numbers of manuscripts i.e. Bodleian!
  ## If too many, redirect to Works Search Results instead.
  ## Use the 'total documents' summary field instead of checking the length of relations to manifestations,
  ## as we now only retrieve minimal information if profile.py (in 'controllers' dir) finds that there
  ## are too many manifestations to handle.
  % if total_docs_fieldname in c.profile : 
    % if c.profile[ total_docs_fieldname ] > h.get_max_relations_for_profile( 'institution' ):

     Too many records to show on Profile Page. Redirecting you to Search Results...
     <%
     if not repository_name_fieldname in c.profile : ## that would be bizarre indeed
       return

     search_term = h.minimal_urlencode( c.profile[ repository_name_fieldname ] )
     if "'" in search_term:
       search_term = search_term.replace( "'", "\'" )
     new_href = '/forms/advanced?repository=' + search_term
     %>

     <script type="text/javascript">
       window.location.href = '${new_href}'
     </script>

      <%return%>
    % endif
  % endif

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
					${self.works_list( repository_contents_fieldname )}
					<br/>
				</div>
			</div>

    		% endif
    
	</div>
</%def>

##--------------------------------------------------------------------------------------

<%def name="body()"></%def>

##--------------------------------------------------------------------------------------
