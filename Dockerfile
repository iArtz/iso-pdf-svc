FROM node:alpine

ARG VERSION

ARG NODE_ENV

ENV VERSION=${VERSION}

ENV NODE_ENV=${NODE_ENV}

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk update && \
  apk add --no-cache chromium 

WORKDIR /app

COPY package.json .

RUN yarn install --prod

COPY . .

CMD yarn start