import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class RsstestController(BaseController):

    def index(self):
        return render('/main/rsstest.mako')
