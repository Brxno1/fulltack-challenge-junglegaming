FROM node:20-alpine AS development

WORKDIR /challenge

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY packages/ ./packages/

COPY apps/web/package.json ./apps/web/

RUN pnpm install --no-frozen-lockfile

COPY apps/web/ ./apps/web/

WORKDIR /challenge/apps/web

EXPOSE 3000

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
