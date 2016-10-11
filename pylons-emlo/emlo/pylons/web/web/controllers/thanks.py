import logging
import smtplib
from email.mime.text import MIMEText

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render
from web.lib.helpers import get_records_from_solr

import solr

import sys
if '../../workspace/indexing/src' not in sys.path:
    sys.path.insert(0, '../../workspace/indexing/src') # Add workspace files into path. TODO: Fix!
    
import solrconfig

log = logging.getLogger(__name__)

class ThanksController(BaseController):

    def index(self):
        requests = request.params
    
        if 'id' in requests:
            c.id = requests['id']
            
            sol = solr.SolrConnection( solrconfig.solr_urls['all'] )
            sol_response = sol.query( "id:uuid\:"+c.id , score=False, rows=1, start=0)

            if len( sol_response.results ) == 1 :
                obj = sol_response.results[0]                
                if obj:                                   
                    c.record = obj                    
                    return render('/main/thanks.mako')
                    
        return redirect( url(controller='home') )

    