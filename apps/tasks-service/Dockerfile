FROM node:20-alpine

WORKDIR /challenge

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/ ./packages/

COPY apps/tasks-service/package.json ./apps/tasks-service/

RUN pnpm install --no-frozen-lockfile

COPY apps/tasks-service/ ./apps/tasks-service/

WORKDIR /challenge/apps/tasks-service

EXPOSE 3003

CMD ["pnpm", "run", "start:dev"]
