"""Routes configuration

The more specific and detailed routes should be defined first so they
may take precedent over the more generic routes. For more information
refer to the routes manual at http://routes.groovie.org/docs/
"""
from routes import Mapper

def make_map(config):
    """Create, configure and return the routes Mapper"""
    map = Mapper(directory=config['pylons.paths']['controllers'],
                 always_scan=config['debug'])

    map.minimization = False
    map.explicit = False

    # The ErrorController route (handles 404/500 error pages); it should
    # likely stay at the top, ensuring it can always be resolved
    map.connect('/error/{action}', controller='error')
    map.connect('/error/{action}/{id}', controller='error')

    # Redirect some mistyped stuff
    map.redirect('/profile/institutions/{id:.*}', '/profile/institution/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/repositories/{id:.*}', '/profile/institution/{id}', _redirect_code="301 Moved Permanently")
    map.redirect('/profile/repository/{id:.*}', '/profile/institution/{id}', _redirect_code="301 Moved Permanently")
    map.redirect('/profile/repositorys/{id:.*}', '/profile/institution/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/locations/{id:.*}', '/profile/location/{id}', _redirect_code="301 Moved Permanently")
    map.redirect('/profile/places/{id:.*}', '/profile/location/{id}', _redirect_code="301 Moved Permanently")
    map.redirect('/profile/place/{id:.*}', '/profile/location/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/images/{id:.*}', '/profile/image/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/manifestations/{id:.*}', '/profile/manifestation/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/works/{id:.*}', '/profile/work/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/people/{id:.*}', '/profile/person/{id}', _redirect_code="301 Moved Permanently")
    map.redirect('/profile/persons/{id:.*}', '/profile/person/{id}', _redirect_code="301 Moved Permanently")

    map.redirect('/profile/resources/{id:.*}', '/profile/resource/{id}', _redirect_code="301 Moved Permanently")

    # Do some real work
    map.connect('/', controller='home', action='index')
    map.connect('/index', controller='home', action='index')
    map.connect('/index/', controller='home', action='index')

    map.connect('/home', controller='home', action='index')
    map.connect('/home/', controller='home', action='index')

    map.connect('/advanced', controller='search', action='index')
    map.connect('/advanced/', controller='search', action='index')

    map.connect('/collection', controller='emlo_collections', action='index')
    map.connect('/collections', controller='emlo_collections', action='index')

    map.connect('/catalogue', controller='emlo_collections', action='index')
    map.connect('/catalogues', controller='emlo_collections', action='index')

    map.connect('/{controller}/{action}/{id}')  # profile/{action}/id
    map.connect('/{controller}/{action}')  # search/results, browse/{action}

    map.connect('/{controller}/', action='index')  # contribute, technical, about, home, search, browse
    map.connect('/{controller}', action='index')  # contribute, technical, about, home, search, browse

    # Short URL redirects
    map.connect('/p/{ipersonid}', controller='profile', action='p')  # person
    map.connect('/w/{iworkid}', controller='profile', action='w')  # work
    map.connect('/l/{locationid}', controller='profile', action='l')  # location
    map.connect('/r/{institutionid}', controller='profile', action='r')  # institution

    map.connect('/{id}', controller='profile', action='i')  # general

    return map
