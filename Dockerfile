FROM node:18.18-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
