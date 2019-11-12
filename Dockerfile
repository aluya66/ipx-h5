FROM nginx:alpine

ARG CHANGE_SOURCE=true
RUN if [ ${CHANGE_SOURCE} = true ]; then \
    # Change application source from dl-cdn.alpinelinux.org to aliyun source
    sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories \
;fi

RUN apk update \
    && apk upgrade \
    && apk --update add logrotate \
    && apk add --no-cache openssl \
    && apk add --no-cache bash

RUN rm -rf  /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html
ADD ./dist /usr/share/nginx/html
RUN chmod -R 777 /usr/share/nginx/html
RUN ls -lh /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80 443
