FROM node:22.20.0-alpine as deps

WORKDIR /app

COPY package*.json .

RUN npm install

#BUILD環境
FROM node:22.20.0-alpine as builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

#実行環境
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
