# Use the specified Node.js version as the base image
FROM node:16.20.2-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Update package lists and install dependencies
RUN apk update && \
    apk add --no-cache --virtual .build-deps \
        python3 \
        make \
        g++ \
    && pnpm install \
    && apk del .build-deps

# Install project dependencies
RUN pnpm install

# Copy the application code
COPY . .

# Build the application
RUN pnpm run build

# Create a new stage for the production image
FROM node:16.20.2-alpine AS production

# Set the environment variable for production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install only production dependencies
RUN pnpm install --prod

# Copy node_modules and the application code from the development stage
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

# Define the default command to run the application
CMD [ "node", "dist/apps/auth/main" ]
