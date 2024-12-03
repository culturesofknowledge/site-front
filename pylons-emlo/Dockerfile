#
# Create a pylons emlo specific server
#
# Perhaps with commands:
#     docker build -t pylons-emlo:0.2.0 .
#     production
#        docker run --name pylons-emlo -p 5000:5000 --link=solr-emlo:solr --link=redis-emlo:redis -v data:/data -d pylons-emlo:0.2.0
#     development
#        docker run --name pylons-emlo-dev -p 5000:5000 -v $(pwd)/data:/data -v $(pwd)/emlo:/emlo --link=solr-emlo-dev:solr --link=redis-emlo-dev:redis pylons-emlo:0.2.0
FROM bdlss/pylons:0.1.4
MAINTAINER matthew

LABEL version="0.2.1"

# Delete temp server
RUN rm -rf /web/*

# Install python packages
RUN pip install --trusted-host pypi.python.org solrpy==0.9.7 \
				redis==2.10.5 \
				feedparser==4.1 \
				httplib2==0.7.7 \
				fastcsv==0.1.3 \
				pysolr==3.8.1

ADD /emlo/ /emlo/

WORKDIR /emlo/pylons/web
CMD ["paster", "serve", "production.ini"]
