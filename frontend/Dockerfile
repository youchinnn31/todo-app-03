FROM node:22.20.0-alpine as deps

USER node

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

#BUILD環境
FROM node:22.20.0-alpine as builder

USER node

WORKDIR /app

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

RUN npm prune --omit=dev

#実行環境
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

#開発環境
FROM node:22.20.0-alpine AS dev

USER node

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node . .

EXPOSE 5173

CMD ["npm","run","dev"]

