FROM node:18-bullseye-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
EXPOSE 5000
CMD npx prisma migrate deploy && node src/index.js