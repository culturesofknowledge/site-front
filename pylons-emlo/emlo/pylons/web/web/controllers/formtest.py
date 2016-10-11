import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from web.lib.base import BaseController, render

log = logging.getLogger(__name__)

class FormtestController(BaseController):

    def index(self):
        # Return a rendered template
        #return render('/formtest.mako')
        # or, return a string
        return 'Hello World'

    def form(self):
        return render('/form.mako')

    def email(self):
        return 'Your email is: %s' % request.params['email']

