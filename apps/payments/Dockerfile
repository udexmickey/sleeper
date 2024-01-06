# Use a multi-stage build for development and production
FROM node:16.20.2-alpine AS development

WORKDIR /usr/src/app

ENV  NODE_ENV=development

# Copy package files for better caching
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && \
    pnpm install

# Copy the rest of the application files
COPY . .

RUN pnpm build

# Production stage
FROM node:16.20.2-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files for better caching
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally and install production dependencies
RUN npm install -g pnpm && \
    pnpm install --prod

# Copy built files from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Command to run the application
CMD ["node", "dist/apps/payments/main"]