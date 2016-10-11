# -*- coding: utf-8 -*-
<%!
   import web.lib.relations
   relation_fields = web.lib.relations.object_relation_fields['resource']
   
   main_title = 'Resource'
%>

<%inherit file="/main/profile.mako" />

##-------------------------------------------------------------------------------------------

<%def name="for_head()"></%def>

<%def name="for_foot()"></%def>

##-------------------------------------------------------------------------------------------
<%def name="profileRight()">
</%def>

<%def name="profile()">

  ## We should NEVER get to this point. The URI should have been rewritten
  ## to send you through to the work, person etc to which this record relates.

  ## If we do get to this point, it means we must have an orphaned relationship
  ##  - a work has been marked as a duplicate and its data is not being passed 
  ## to the front end. We really need to implement deletion of any such 
  ## orphaned relationships (TODO).

  <p>
  Sorry, this record has not been found. 
  It may have been deleted as a duplicate.
  </p>

</%def>

##-------------------------------------------------------------------------------------------

<%def name="body()"></%def>

##-------------------------------------------------------------------------------------------
