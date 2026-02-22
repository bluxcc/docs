FROM node:24.12.0-slim

COPY package.json source.config.ts waku.config.ts /app/
WORKDIR /app

RUN npm i --legacy-peer-deps

COPY . /app

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
