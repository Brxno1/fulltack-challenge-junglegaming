FROM node:20-alpine AS development

WORKDIR /challenge

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/ ./packages/

COPY apps/auth-service/package.json ./apps/auth-service/

RUN pnpm install --no-frozen-lockfile

RUN pnpm --filter @jungle/constants build && pnpm --filter @jungle/types build

COPY apps/auth-service/ ./apps/auth-service/

WORKDIR /challenge/apps/auth-service

EXPOSE 3002

CMD ["pnpm", "run", "start:dev"]
