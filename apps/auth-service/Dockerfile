FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3002

CMD ["npm", "run", "start:dev"]
