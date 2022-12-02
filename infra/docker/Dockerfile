FROM node:alpine

ARG VERSION

ENV VERSION=${VERSION}

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD yarn start