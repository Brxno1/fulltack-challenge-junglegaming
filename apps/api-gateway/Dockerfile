FROM node:20-alpine AS development

WORKDIR /challenge

RUN npm install -g pnpm

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all packages first
COPY packages/ ./packages/

# Copy api-gateway package.json
COPY apps/api-gateway/package.json ./apps/api-gateway/

# Install all dependencies (including workspace packages)
RUN pnpm install --no-frozen-lockfile

# Copy api-gateway source code
COPY apps/api-gateway/ ./apps/api-gateway/

WORKDIR /challenge/apps/api-gateway

EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]
