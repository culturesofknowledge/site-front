# -*- coding: utf-8 -*-
<%!
   nav_selected = 'home'
   main_title = 'Home'
%>
<%inherit file="/base.mako" />

##===================================================================================================

<%def name="for_head()">
</%def>

##===================================================================================================

<%def name="for_foot()">
   <script type="text/javascript" src="/sources/general/jquery-1.4.2.min.js"></script>
  ##<script type="text/javascript" src="/sources/general/jquery-ui-1.8.4.custom.min.js"></script>
  <script type="text/javascript" src="/sources/pages/home.js"></script>
</%def>

##===================================================================================================

<%def name="body()">
##{
<div id="main">
    <div id="right">
        <div class="box">		
            <h2>An error has occurred</h2>		
            <div class="content textcenter">
                <p>${c.message}</p>
                <br>
                <p>You can go to the <a href="/">home</a> of our site, try a <a href="/search">search</a> or <a href="/browse/people">browse</a> Early Modern Letters Online.</p> Or use the navigation for other areas of your interest.</p>
                <br>
                <p>If the error persists please inform us of the problem using the <a href="/contact">Contact form</a></p>
                  <br>
            </div>
        </div>
    </div>
</div>
##}
</%def>
