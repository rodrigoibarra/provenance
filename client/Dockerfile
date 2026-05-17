FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
COPY packages/schemas/package*.json ./packages/schemas/
RUN npm ci --workspace=client --workspace=packages/schemas --include=optional
RUN npm install @rollup/rollup-linux-x64-musl --include=optional
COPY client/ ./client/
COPY packages/schemas/ ./packages/schemas/
RUN npm run build --workspace=client

FROM nginx:alpine
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8282