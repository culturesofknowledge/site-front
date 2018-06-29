import logging

from web.lib.base import BaseController, render
from pylons.controllers.util import redirect

log = logging.getLogger(__name__)

class MapController(BaseController):

	def index(self):
		return redirect("/vis/geography", code=301)
