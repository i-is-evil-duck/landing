FROM httpd:alpine

COPY httpd.conf /usr/local/apache2/conf/httpd.conf
COPY index.html /usr/local/apache2/htdocs/
COPY css/ /usr/local/apache2/htdocs/css/
COPY js/ /usr/local/apache2/htdocs/js/
COPY hero-icon.webp /usr/local/apache2/htdocs/
COPY favicon.png /usr/local/apache2/htdocs/
COPY cursor.png /usr/local/apache2/htdocs/

EXPOSE 80
