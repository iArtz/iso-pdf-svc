FROM node:alpine

ARG VERSION

ARG NODE_ENV

ENV VERSION=${VERSION}

ENV NODE_ENV=${NODE_ENV}

ENV TZ=Asia/Bangkok

# Set environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install common font
RUN apk add --no-cache \
  tzdata \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates

# Install Sarabun font
RUN mkdir -p /usr/share/fonts/Sarabun \
  && wget -q -O /usr/share/fonts/Sarabun/Sarabun-Regular.ttf "https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Regular.ttf" \
  && wget -q -O /usr/share/fonts/Sarabun/Sarabun-Bold.ttf "https://github.com/google/fonts/raw/main/ofl/sarabun/Sarabun-Bold.ttf" \
  && fc-cache -f

WORKDIR /app

COPY ./build/package.json .

RUN yarn install --prod

COPY ./build .

CMD yarn start