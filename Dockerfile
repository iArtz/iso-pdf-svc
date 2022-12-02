FROM node:alpine

ARG VERSION

ARG NODE_ENV

ENV VERSION=${VERSION}

ENV NODE_ENV=${NODE_ENV}

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk update && \
  apk add --no-cache \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  ttf-freefont

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

CMD yarn start