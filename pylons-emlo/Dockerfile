#
# Create a pylons emlo specific server
#
# Perhaps with commands:
#     docker build -t pylons-emlo:v.v.v .
#     docker run --name pylons-emlo -p 5000:5000 -d pylons-emlo:v.v.v
FROM pylons:0.1.3
MAINTAINER matthew

# Delete temp server
RUN rm -rf /web/*

# Install python packages
RUN pip install solrpy==0.9.1 redis==1.34.1 feedparser==4.1

ADD /emlo/ /emlo/

WORKDIR /emlo/pylons/web
CMD ["paster", "serve", "development.ini"]