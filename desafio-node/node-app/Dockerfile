FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

EXPOSE 3000
CMD ["dockerize", "-wait", "tcp://db:3306", "-timeout", "60s", "node", "index.js"]