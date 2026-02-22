FROM node:18.18-slim

COPY package.json pnpm-lock.yaml ./

WORKDIR /app

RUN npm i --legacy-peer-deps

COPY . /app

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
