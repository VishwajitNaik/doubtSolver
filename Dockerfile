FROM node:20.18.0 AS base

WORKDIR /src

COPY package*.json .

RUN npm install

COPY . .

CMD npm run dev
