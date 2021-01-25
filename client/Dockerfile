FROM node:15.6.0-alpine3.11

WORKDIR /client/

COPY package.json package-lock.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000
