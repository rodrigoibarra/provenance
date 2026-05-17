FROM node:24-alpine

WORKDIR /app

# Copy root package files for workspace
COPY package*.json ./
COPY api/package*.json ./api/
COPY packages/schemas/package*.json ./packages/schemas/

# Install dependencies
RUN npm ci --workspace=api --workspace=packages/schemas --include=optional

# Copy source
COPY api/ ./api/
COPY packages/schemas/ ./packages/schemas/

# Build
RUN npm run build --workspace=api

WORKDIR /app/api

EXPOSE 9999

CMD ["node", "dist/index.js"]