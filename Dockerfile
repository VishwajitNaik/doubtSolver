# Base image to build the app
FROM node:20.18.0 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for build tools like Tailwind and PostCSS)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js project
RUN npm run build

# ------------------------------
# Use a smaller image for production
FROM node:20.18.0 AS production

# Set the working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Set the production environment
ENV NODE_ENV production

# Start the Next.js application
CMD ["npm", "run", "start"]
