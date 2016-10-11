# -*- coding: utf-8 -*-
<%!
  texxt = "matthew"
   # use with: ${pag.attr.texxt}
%>
<%def name="pagination(baseurl,fields,count,current,rows=25)">
   <%
      rows = int(rows)
      pages_to_jump = int( 10 );
      firstpagestart = 0
      if count % rows == 0 :
         lastpagestart = count - rows
      else :
         lastpagestart = count - (count % rows)
      pagecount = lastpagestart / rows

      current = int(current)
      currentpage = (current / rows) + 1
      doublerows = rows * 2
      
      back_jump = current - (pages_to_jump*rows)
      if back_jump < firstpagestart :
         back_jump = firstpagestart
      forward_jump = current + (pages_to_jump*rows)
      if forward_jump > lastpagestart :
         forward_jump = lastpagestart
   %><div class="row"><div class="column small-12">
      <p>Page ${currentpage} of ${pagecount+1}. 
      % if pagecount > pages_to_jump :
         (The arrows will jump blocks of ${pages_to_jump} pages.)
      % endif
      </p>
	<ul class="pagination" role="menubar" aria-label="Pagination">
         % if current == firstpagestart :
            <li class="arrow current"><a href="">First</a></span>
		<li class="unavailable"><a href="">&laquo;</a></li>
         % else :
            <li><a class="arrow" href="${h.query_url( baseurl, fields, add=['start',firstpagestart])}">First</a></li>
            
            % if count > rows :
               <li><a href="${h.query_url( baseurl, fields, add=['start',back_jump])}">&laquo;</a></li>
            % else :

            %endif
         % endif
         
         % if current - doublerows > firstpagestart:
            <li class="unavailable"><a href="#">&hellip;</a></li>
         % else :
            
         % endif
         
         % if current - doublerows >= firstpagestart :
            <li><a href="${h.query_url( baseurl, fields, add=['start',current-doublerows])}">${currentpage-2}</a></li>
         % else :
            
         % endif  
         
         % if current - rows >= firstpagestart :
            <li><a href="${h.query_url( baseurl, fields, add=['start',current-rows])}">${currentpage-1}</a></li>
         % else :
           
         % endif

         <li class="current"><a href="">${currentpage}</a></li>

         % if current + rows <= lastpagestart :
            <li><a href="${h.query_url( baseurl, fields, add=['start',current+rows])}">${currentpage+1}</a></li>
         % else :
            
         % endif
         
         % if current + doublerows <= lastpagestart :
            <li><a href="${h.query_url( baseurl, fields, add=['start',current+doublerows])}">${currentpage+2}</a></li>
         % else :
            <span>&nbsp;</span>
         % endif
         
         % if current + doublerows < lastpagestart:
            <li class="unavailable"><a href="">&hellip;</a></li>
         % else :
            
         % endif
         
         % if current == lastpagestart :
            <li class="unavailable"><a href="">&raquo;</a></li>
            <li class="current"><a href="">Last</a></li>
         % else :
             % if count > rows :
               <li><a href="${h.query_url( baseurl, fields, add=['start',forward_jump])}">&raquo;</a></li>
            % else :
               
            % endif
            <li><a href="${h.query_url( baseurl, fields, add=['start',lastpagestart])}">Last</a></li>
         % endif
       </ul></div></div>
</%def>

