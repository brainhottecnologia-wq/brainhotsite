FROM nginx:alpine

COPY index.html                      /usr/share/nginx/html/
COPY styles.css                      /usr/share/nginx/html/
COPY script.js                       /usr/share/nginx/html/
COPY googleaf5e5d361b734308.html     /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
