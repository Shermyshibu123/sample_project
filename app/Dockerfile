FROM node:14.21.0 as dev
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:staging && rm -rf node_modules
FROM nginx:alpine
COPY ./nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /app/build/ /usr/share/nginx/html/

