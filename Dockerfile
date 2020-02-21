FROM node:lts-alpine3.9
WORKDIR /usr/src/studujdopravu

COPY package*.json ./

RUN apk add --no-cache --virtual .gyp python make automake g++ autoconf \
    && npm install --silent \
    && apk del .gyp

COPY . .
EXPOSE 3000

RUN npm run build && npm start
