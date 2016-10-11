# -*- coding: utf-8 -*-
<%def name="footer(selected='')">
    <!-- footer with logos -->
    <div class="footer-divider">
	    <div class="row footer">
	      <div class="large-3 medium-6 columns centered"><a href="http://www.culturesofknowledge.org/" target="_blank"><img src="/img/CofKLogoBlack.png" alt="Cultures of Knowledge Logo" class="hide-for-small"/><span class="hide-for-medium-up">Cultures of Knowledge</span></a></div>

	      <div class="large-3  medium-6 columns centered"><a href="http://www.bodleian.ox.ac.uk/" target="_blank"><img src="/img/Bodleian_Libraries_logo.svg" alt="Bodleian Libraries Logo" width= "120" class="hide-for-small" style="margin-left:40px;"/><span class="hide-for-medium-up">Bodleian Libraries</span></a></div>

	      <div class="large-3 medium-6 columns centered"><a href="http://www.mellon.org/" target="_blank"><img src="/img/Andrew_Mellon_Foundation_logo.svg" alt="Andrew Mellon Foundation Logo" width= "140" class="hide-for-small"/><span class="hide-for-medium-up">Andrew Mellon Foundation</span></a></div>

	      <div class="large-3 medium-6 columns centered"><a href="http://ox.ac.uk" target="_blank"><img src="/img/University_of_Oxford_logo.gif" alt="University of Oxford Logo" class="hide-for-small"/><span class="hide-for-medium-up">University of Oxford</span></a></div>

	    </div>
    </div>
   <!-- end footer -->
</%def>
<%def name="footer_old(selected='')">
	<div id="footer">
		<p>
			&diams; &copy; Cultures of Knowledge 2011 &diams;
			% for items in app_globals.nav:
            % if items['id'] == selected :
               <em class="selected"><a href="#top">${items['display']} (top)</a></em> &diams;
            % else :
				   <a href="${items['url']}">${items['display']}</a> &diams;
            % endif
			% endfor
		</p>
		<a href="http://www.history.ox.ac.uk/cofk/" target="_blank" style="border:none;"><img src="/images/CofKLogoBlack.png" border="0" class="valign_middle" height="78" alt="Cultures of Knowledge"></a>
		<a href="http://www.bodleian.ox.ac.uk/" target="_blank" style="border:none;"><img src="/images/Bodleian_Libraries_logo.png" class="valign_middle" height="78" border="0" alt="Bodleian Libraries"/></a>
		<a href="http://www.mellon.org/" target="_blank" style="border:none;"><img src="/images/Andrew_Mellon_Foundation_logo.png" class="valign_middle" border="0" alt="The Andrew W. Mellon Foundation"/></a>
		<a href="http://www.ox.ac.uk/" target="_blank" style="border:none;"><img src="/images/University_of_Oxford_logo.gif" class="valign_middle" border="0" alt="University of Oxford"/></a>

	</div><!--id:footer-->
</%def>
<%def name="someother_footer()">
	<!-- Do something different here for specific pages -->
</%def>
