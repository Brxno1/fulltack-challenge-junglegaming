FROM node:20-alpine

WORKDIR /challenge

RUN npm install -g pnpm

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all packages first
COPY packages/ ./packages/

# Copy auth-service package.json
COPY apps/auth-service/package.json ./apps/auth-service/

# Install all dependencies (including workspace packages)
RUN pnpm install --no-frozen-lockfile

# Copy auth-service source code
COPY apps/auth-service/ ./apps/auth-service/

WORKDIR /challenge/apps/auth-service

EXPOSE 3002

CMD ["pnpm", "run", "start:dev"]
