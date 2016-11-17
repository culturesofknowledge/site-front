#
# Tweak the solr server
#
# Perhaps with commands:
#     docker build -t solr-emlo:0.3.4 .
#     production:
#     docker run --name solr-emlo -p 8983:8983 -d solr-emlo:0.3.4
#     developing:
#     docker run --name solr-emlo-dev -v $(pwd)/solr/home:/opt/solr/server/solr/home -p 8983:8983 solr-emlo:0.3.4
FROM solr:6.2
MAINTAINER matthew

LABEL version="0.3.4"

# Tweak the config with more heap
RUN sed -i "s/SOLR_HEAP=\".*\"/SOLR_HEAP=\"2048m\"/" /opt/solr/bin/solr.in.sh

# Solr core configuration
ADD /solr/home /opt/solr/server/solr/home

# Allow solr to write to folders
#RUN chown -R :solr /opt/solr/server/solr/home
#RUN chmod -R 777 /opt/solr/server/solr/home