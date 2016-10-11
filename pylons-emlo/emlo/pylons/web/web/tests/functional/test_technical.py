from web.tests import *

class TestTechnicalController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='technical', action='index'))
        # Test response...
