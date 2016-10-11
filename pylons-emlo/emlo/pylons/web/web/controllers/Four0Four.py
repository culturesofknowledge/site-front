import logging, solr

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class Four0FourController(BaseController):

    def index(self):
                
        return render('/main/Four0Four.mako')
        #return response.results
