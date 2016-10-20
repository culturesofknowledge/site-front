#
# Create a pylons emlo specific server
#
# Perhaps with commands:
#     docker build -t pylons-emlo:0.1.8 .
#     production
#        docker run --name pylons-emlo -p 5000:5000 --link=solr-emlo-dev-1:solr -v data:/data -d pylons-emlo:0.1.8
#     development
#        docker run --name pylons-emlo-dev -p 5000:5000 -v data:/data -v emlo:/emlo --link=solr-emlo-dev-1:solr --link=redis-emlo-dev-1:redis pylons-emlo:0.1.8
FROM pylons:0.1.3
MAINTAINER matthew

LABEL version="0.1.8"

# Delete temp server
RUN rm -rf /web/*

# Install python packages
RUN pip install solrpy==0.9.7 redis==2.10.5 feedparser==4.1

ADD /emlo/ /emlo/

WORKDIR /emlo/pylons/web
CMD ["paster", "serve", "development.ini"]