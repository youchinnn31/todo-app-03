FROM node:22-alpine AS deps

USER node

WORKDIR /app

COPY --chown=node:node package*.json .

RUN npm ci

FROM node:22-alpine AS builder

USER node

WORKDIR /app

COPY --chown=node:node . .

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

RUN npm run build

RUN npm prune --omit=dev

FROM node:22-alpine AS production

USER node

WORKDIR /app

COPY --from=builder --chown=node:node /app/node_modules ./node_modules

COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE 3001

CMD ["node","dist/index.js"]

FROM node:22-alpine AS dev

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node prisma ./prisma

RUN npx prisma generate

COPY --chown=node:node . .

EXPOSE 3001

CMD ["npm","run","dev"]
