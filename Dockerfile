FROM node:erbium-alpine as builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache python make automake g++ autoconf

COPY package*.json ./
RUN npm install

# Second Stage
FROM node:erbium-alpine

WORKDIR /usr/src/studujdopravu
COPY --from=builder node_modules node_modules

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
