FROM httpd:latest

COPY ./build/ /usr/local/apache2/htdocs/
