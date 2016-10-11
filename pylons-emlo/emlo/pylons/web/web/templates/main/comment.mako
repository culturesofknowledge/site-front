# -*- coding: utf-8 -*-
<%!
   nav_selected = 'comment'
   main_title = 'Comment'
%>
<%inherit file="/base.mako" />

<%def name="for_head()">
</%def>

<%def name="for_foot()">
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</%def>

<%def name="body()">
	<div class="row">
		<div class="columns hide-for-small large-2 ">
		</div>

		<div class="columns small-12 large-10">
			<br/>
			<h3>Please complete the form below if you wish to comment on any aspect of this record. We will be sent the unique ID/URL of the record alongside your remarks and will get back to you as soon as we can.</h3>
			<br/>

			<form action="/comment/send" method="POST">

				<label style="width:150px;">To:</label> &nbsp; <strong>Early Modern Letters Online</strong>

				<label style="width:150px;">Subject:</label> &nbsp; Comment on EMLO record
				<br/><br/>

				<label for="name" style="width:150px;">Your name:</label>
				<input type="text" name="name" id="name" value="${c.name}" />
				% if 'name' in c.messages :
					<small class="error">${c.messages['name']}</small>
                % endif

				<label for="email" style="width:150px;">Your e-mail address:</label>
				<input type="text" name="email" id="email" value="${c.email}" />
				% if 'email' in c.messages :
					<small class="error">${c.messages['email']}</small>
				% endif

				<label for="comment" class="floatleft" style="width:150px;">Your comment:</label>

				<textarea name="comment" id="comment" rows="10" cols="50" class="floatleft;" style="margin-left:3px; padding:10px; font-family: 'coustard', 'times new roman', 'times', serif;">${c.comment}</textarea>
				% if 'comment' in c.messages :
					<small class="error">${c.messages['comment']}</small>
				% endif


				<input type="hidden" name="id" value="${c.record['id']}"/>

				<input type="hidden" name="type" value="${c.record['object_type']}"/>



				<!-- Google Captcha -->
				<label for="g-recaptcha-response" >Captcha:</label>
				<div class="g-recaptcha" data-sitekey="6LciPgATAAAAAHUiuWMa2SBX3bbbxSzJY3-2TLeY"></div>
				% if 'captcha' in c.messages :
					<small class="error">${c.messages['captcha']}</small>

				% endif

				<br/><input type="submit" class="button submit" value="Send"/>

				% if 'general' in c.messages :
					<div data-alert class="alert-box alert">${c.messages['general']}</div>
				% endif

			</form>

		</div>
	</div>
</%def>
