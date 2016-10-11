#
# Tweak the solr server
#
# Perhaps with commands:
#     docker build -t solr-emlo:v.v.v .
#     production:
#     docker run --name solr-emlo-1 -p8983:8983 solr-emlo:v.v.v
#     developing:
#     docker run --name solr-emlo-dev-1 -v $(pwd)/solr/home:/opt/solr/server/solr/home -p8983:8983 solr-emlo:0.1.0
FROM solr:6.2
MAINTAINER matthew

# Tweak the config with more heap
RUN sed -i "s/SOLR_HEAP=\".*\"/SOLR_HEAP=\"1024m\"/" /opt/solr/bin/solr.in.sh

# Solr core configuration
ADD /solr/home /opt/solr/server/solr/
