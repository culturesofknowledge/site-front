import logging

from web.lib.base import BaseController, render
from pylons.controllers.util import abort, redirect

log = logging.getLogger(__name__)


class VisController(BaseController):

	def index(self):
		return redirect( "http://emlo-portal.bodleian.ox.ac.uk/collections/?page_id=480", code=301 )

	def geography(self):
		return render( '/main/vis/map.mako' )

	def chronology(self):
		return render( '/main/vis/chronology.mako' )
