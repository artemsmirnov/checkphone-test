FROM node:9-alpine

WORKDIR /usr/app

RUN apk add --no-cache make gcc g++ python
COPY package.json .
RUN npm install --quiet
RUN apk del make gcc g++ python

COPY . .