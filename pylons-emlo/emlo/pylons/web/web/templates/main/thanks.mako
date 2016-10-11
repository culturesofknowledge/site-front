# -*- coding: utf-8 -*-
<%!
   nav_selected = 'comment'
   main_title = 'Comment'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
</%def>

<%def name="for_foot()">
</%def>

<%def name="body()">
	<div class="row">
		<div class="columns hide-for-small large-2 side">

		</div>

		<div class="columns small-12 large-10">
			<br/>
			<p>Email sent - thanks for your feedback!</p>

			<br/><br/>

            <form method="link" action="/profile/${c.record['object_type']}/${c.record['id'].replace("uuid:","")}">
            <input type="submit"  class="button submit" value="Return to Record"/></form>

			<br/><br/><br/><br/>

		</div>
		
	</div>
</%def>
