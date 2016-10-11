# -*- coding: utf-8 -*-

<%namespace name="base" file="base.mako" import="normal_text_input_field" />

<%def name="header(selected='')">
<!-- top menu -->
<div class="contain-to-grid yellow-bg">
	<nav class="top-bar yellow-bg" data-topbar>
		<ul class="title-area">
			<li class="name">
				<h1><a class="no-decoration" href="/" accesskey="1"><img src="/img/emlo_logo.png" alt="EMLO logo" class="show-for-large-up menu-name"/></a>
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
<%def name="header_old(selected='')">
  <div id="logo">
      <a href="/" style="border:none;"><img src="/images/IE7_Logo_Variant.png" border="0" alt="Early Modern Letters Online" width="150" height="211"></a>
      <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
  </div>

  <div id="head">

    <div id="nav">

      <ul>
      <li style="margin-left:20px;"></li>
        % for items in app_globals.nav:
          % if items['id'] == selected :
            <li class="selected">\
          % else:
            <li>\
          % endif
          <a href="${items['url']}">${items['display']}</a></li>
        % endfor
      </ul>

      ################ Start 'Search everything' form (appears on ALL tabs) ###############

      <form id="quicksearch" action="/forms/quick">
	  <label class="white">Quick Search</label>
      ${base.normal_text_input_field( 'everything' )}

	  <input type="image" id="submit-quick" name="submit-quick" value="Search"  src="/images/quick_search_button.png" class="quick_btn"/>

      <input type="hidden" id="search_type" name="search_type" value="quick"/>

      </form>
      ################ End 'Search everything' form ###############

		</div>
		<div id="bottom_shadow"></div>
	</div><!--id:head-->
</%def>
<%def name="someother_footer()">
  <!-- Do something different here for specific pages, none yet though -->
</%def>
