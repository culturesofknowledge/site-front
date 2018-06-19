import logging

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class MapController(BaseController):

	def index(self):
		return render('/main/map.mako')
