import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class AboutController(BaseController):

	def index(self):
		return redirect( "http://emlo-portal.bodleian.ox.ac.uk/collections/?page_id=907", code=301 )
		#return render('/main/about.mako')
