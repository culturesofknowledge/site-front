#
# Create a nginx emlo specific server
#
# Perhaps with commands:
#     docker build -t nginx-emlo:0.1.0 .
#     production
#        docker run --name nginx-emlo -p 80:80 --link=pylons-emlo:pylons -d nginx-emlo:0.1.0
#     development
#        docker run --name nginx-emlo-dev -p 80:80 --link=pylons-emlo-dev:pylons nginx-emlo:0.1.0
#
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf

LABEL version="0.1.0"