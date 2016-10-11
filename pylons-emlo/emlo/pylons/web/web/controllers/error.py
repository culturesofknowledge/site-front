import cgi

from paste.urlparser import PkgResourcesParser
from pylons.middleware import error_document_template
from webhelpers.html.builder import literal
from pylons import request, response, tmpl_context as c

from web.lib.base import BaseController, render


class ErrorController(BaseController):
    """Generates error documents as and when they are required.

    The ErrorDocuments middleware forwards to ErrorController when error
    related status codes are returned from the application.

    This behaviour can be altered by changing the parameters to the
    ErrorDocuments middleware in your config/middleware.py file.

    """
    def document(self):
    
        """Render the error document"""
        icode = 404
        code= "404"
        status = "Not Found"
        resp = request.environ.get('pylons.original_response')
        if resp and resp.body:
            content = literal(resp.body)
        else:
            content = request.GET.get('message', '')
            if content:
                content = cgi.escape(content)
        if resp and resp.status_int: 
            icode = resp.status_int
            code = str(resp.status_int)
        elif request.GET.get('code', ''):
            code = request.GET.get('code')
            if code:
                code = cgi.escape(code)
            else:
                code = 404
        if resp and resp.status: 
            status = resp.status
        c.message = request.GET.get('message', '')
        if c.message:
            c.message = cgi.escape(c.message)
        else:
            c.message = content
        
        print code
        if code == "404":
            return render('/main/Four0Four.mako')
        else:
            return render('/main/error.mako')    
        
        """Render the error document"""
        """
        request = self._py_object.request
        resp = request.environ.get('pylons.original_response')
        content = literal(resp.body) or cgi.escape(request.GET.get('message', ''))
        page = error_document_template % \
            dict(prefix=request.environ.get('SCRIPT_NAME', ''),
                 code=cgi.escape(request.GET.get('code', str(resp.status_int))),
                 message=content)
        return page
        """

    def img(self, id):
        """Serve Pylons' stock images"""
        return self._serve_file('/'.join(['media/img', id]))

    def style(self, id):
        """Serve Pylons' stock stylesheets"""
        return self._serve_file('/'.join(['media/style', id]))

    def _serve_file(self, path):
        """Call Paste's FileApp (a WSGI application) to serve the file
        at the specified path
        """
        request = self._py_object.request
        request.environ['PATH_INFO'] = '/%s' % path
        return PkgResourcesParser('pylons', 'pylons')(request.environ, self.start_response)
        
