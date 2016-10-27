#
# Create a pylons server
#
# Perhaps with commands:
#     docker build -t pylons:0.1.4 .
#     docker run --name pylons-emlo -p 5000:5000 -d pylons:0.1.4
FROM python:2.7
MAINTAINER matthew

LABEL version="0.1.4"

# Install pylons
RUN pip install WebOb==1.3 \
				Pylons==1.0 \
                repoze.who==2.0a4 \
                repoze.who-friendlyform==1.0.8

# Create an initial server
RUN paster create --no-interactive -t pylons web
# Tweak the config so it runs on the containers current IP address. (replace 127.0.0.1 with 0.0.0.0)
RUN sed -i 's/127\.0\.0\.1/0\.0\.0\.0/' /web/development.ini

EXPOSE 5000

#HEALTHCHECK --interval=5m CMD curl -f http://localhost:5000/ || exit 1

# Run the server
WORKDIR /web
CMD ["paster", "serve", "/web/development.ini"]

#COPY
#VOLUME