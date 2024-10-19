FROM node:20.18.0 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --production
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm" ,"run" ,"dev"]
