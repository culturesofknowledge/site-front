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

<!-- 404 stuff -->

    <div class="row">
      <div class="large-3 columns">
        <br>
      </div>
      <div class="large-9 columns">
        <br>
        <h1>This is somewhat embarrassing, isn't it?</h1>
        <p>The page you were looking for might not be here. It could have been moved, deleted or maybe the URL you typed or the link you clicked was incorrect in some way.</p>

        <br>
        <p style="font-size:x-small;"><img src="/images/EMLO_404.png" style="padding:10px; background:#fff; border:1px solid #999;"/><br>
        <a href="http://www.rijksmuseum.nl/collectie/RP-P-OB-7367/de-alchemist" target="_blank">Image Source: Rijksmuseum, Amsterdam. CC BY 3.0.</a></p>
        <br>
        <p>You can try the Basic and Intermediate searches on our <a href="http://emlo.bodleian.ox.ac.uk/">Homepage</a>, try an <a href="http://emlo.bodleian.ox.ac.uk/advanced">Advanced Search</a>, or go to <a href="http://emlo.bodleian.ox.ac.uk/browse/people">Browse</a></p>
        <br>
        <p>You can also check our <a href="http://emlo.bodleian.ox.ac.uk/humans.txt" target="_blank">humans.txt</a> to discover who participated in this project!</p>
        <br>

        <h2>Try Again?</h2>
        <p>I know this didn&rsquo;t work before but you may want to try searching again, only this time keep your fingers crossed!</p>
        <form style="display:inline;" action="http://emlo.bodleian.ox.ac.uk/forms/quick" method="get">
        <div class="row collapse">
        <div class="large-5 medium-5 small-12 columns">
        <input type="text" value="" id="s" name="s" /> 
        </div>
        <input class="button" type="submit" value="Search" />
        </form>  
        <br><br>  

      </div><!-- 9 columns -->
    </div><!-- row -->

<!-- end of 404 -->

##}
</%def>
