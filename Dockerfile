FROM node:alpine

ARG VERSION

ARG NODE_ENV

ENV VERSION=${VERSION}

ENV NODE_ENV=${NODE_ENV}

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apk update && \
  apk add --no-cache chromium font-noto-thai msttcorefonts-installer fontconfig ttf-tlwg && \
  update-ms-fonts

RUN fa-cache -f && rm -rf /var/cache/*

WORKDIR /app

COPY ./build/package.json .

RUN yarn install --prod

COPY ./build .

CMD yarn start