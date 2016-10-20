#
# Tweak the solr server
#
# Perhaps with commands:
#     docker build -t solr-emlo:0.3.3 .
#     production:
#     docker run --name solr-emlo -p8983:8983 -d solr-emlo:0.3.3
#     developing:
#     docker run --name solr-emlo-dev -v $(pwd)/solr/home:/opt/solr/server/solr/home -p8983:8983 solr-emlo:0.3.3
FROM solr:6.2
MAINTAINER matthew

LABEL version="0.3.3"

# Tweak the config with more heap
RUN sed -i "s/SOLR_HEAP=\".*\"/SOLR_HEAP=\"1024m\"/" /opt/solr/bin/solr.in.sh

# Solr core configuration
ADD /solr/home /opt/solr/server/solr/home
