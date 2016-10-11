from web.tests import *

class TestContributeController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='contribute', action='index'))
        # Test response...
