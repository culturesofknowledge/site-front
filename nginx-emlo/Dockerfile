#
# Create a nginx emlo specific server
#
# Perhaps with commands:
#     docker build -t pylons-emlo:0.2.0 .
#     production
#        docker run --name pylons-emlo -p 5000:5000 --link=solr-emlo-dev-1:solr -v data:/data -d pylons-emlo:0.2.0
#     development
#        docker run --name pylons-emlo-dev -p 5000:5000 -v $(pwd)/data:/data -v $(pwd)/emlo:/emlo --link=solr-emlo-dev:solr --link=redis-emlo-dev:redis pylons-emlo:0.2.0
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf