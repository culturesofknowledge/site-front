# -*- coding: utf-8 -*-
<%inherit file="/main/result.mako" />

<%def name="options()">

   <%namespace name="tran" file="/helpers/translate.mako" import="*"/>

   <div id="current">
      <h3>Current</h3>
      
      <table class="current">
      </table>
   </div>

   <div id="options">
   </div>
</%def>

<%def name="results()">
      Values passed:
      % for key,params in c.query['request'].iteritems() :
         <p>"${key}" : "${params}",</p>

      % endfor
</%def>

<%def name="body()">
</%def>
