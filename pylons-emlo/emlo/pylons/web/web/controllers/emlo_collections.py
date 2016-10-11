import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class EmloCollectionsController(BaseController):

	def index(self):
		return redirect( "http://emlo.bodleian.ox.ac.uk/blog/?page_id=480", code=301 )
		#return render('/main/emlo_collections.mako')
