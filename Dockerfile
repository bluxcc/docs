FROM node:24.12.0-slim

COPY package.json pnpm-lock.yaml /app
COPY . /app

WORKDIR /app

RUN npm i --force

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
