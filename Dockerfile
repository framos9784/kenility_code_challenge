FROM node:current-alpine3.16

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
RUN yarn start:dev