FROM node:lts-alpine as BUILD_IMAGE

RUN apk add --no-cache git build-base sqlite python3

COPY . /snowman

WORKDIR /snowman

RUN git config --global url.https://github.com/.insteadOf ssh://git@github.com/
RUN npm ci --no-optional && npm ci --prefix ./app && npm ci --prefix ./wrapper
RUN npm run release-app
RUN npm run build --prefix ./wrapper

FROM node:lts-alpine

COPY --from=BUILD_IMAGE /snowman/library /snowman/library
COPY --from=BUILD_IMAGE /snowman/wrapper /snowman/wrapper

RUN mkdir -p /data

EXPOSE 8123
WORKDIR /snowman/wrapper

ENTRYPOINT npm run execute-api -- --headless --hostname=0.0.0.0 --port=8123 --storageDirectory=/data
