FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs14:14.20.0 AS builder
USER root
WORKDIR /app

ENV NODE_ENV production

COPY package*.json tsconfig*.json ./

COPY src src
COPY public public
COPY node_modules node_modules
COPY schema schema
# COPY .eslint* ./

# RUN GENERATE_SOURCEMAP=false npm run openapi \
# && npm run sass \
# && npm run build

RUN npm run build

USER nginx

# Stage 2
FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.23.2

USER nginx

COPY --from=builder --chown=nginx:nginx /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]