# -*- coding: utf-8 -*-

<%namespace name="base" file="base.mako" import="normal_text_input_field" />

<%def name="header(selected='')">
<!-- top menu -->
<div class="contain-to-grid yellow-bg">
	<nav class="top-bar yellow-bg" data-topbar>
		<ul class="title-area">
			<li class="name">
				<h1><a style="min-width:152px" class="no-decoration" href="/" accesskey="1">
					<img style="width:152px;" src="/img/emlo_logo.png" alt="EMLO logo" class="show-for-large-up menu-name"/></a>
					<strong><a class="no-decoration hide-for-large-up" href="/" accesskey="1">EMLO  &nbsp;&nbsp;</a></strong>
				</h1>
			</li>
			<li class="toggle-topbar menu-icon"><a href="/">Menu</a></li>
		</ul>

		<section class="top-bar-section yellow-bg">
			<!-- Left Nav Section -->
			<ul class="left yellow-bg">
				% for items in app_globals.nav:
					<%
						li_class = ""
						if items['id'] == selected :
							li_class += "active" + " "

						if items['id'] == 'about' :
							li_class += "red" + " "
					%>
				<li class="${li_class}"><a href="${items['url']}" accesskey="${items['accesskey']}">${items['display']}</a></li>\
				% endfor
			</ul>

			<!-- Right Nav Section -->
			<ul class="right yellow-bg">
				<!-- search bar -->
				<li class="has-form">
					<form action="/forms/quick" method="get" id="circle-search">
						<div class="row collapse">
							<input name="everything" type="search" placeholder="Keywords..."/>
                            <input name="search_type" type="hidden" value="quick"/>
						</div>
					</form>
				</li>
				<!-- end of search bar -->
			</ul>

		</section>
	</nav>
</div>
<!-- end of menu -->
</%def>

<%def name="someother_footer()">
  <!-- Do something different here for specific pages, none yet though -->
</%def>
