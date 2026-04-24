# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Build TypeScript (if using TS)
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "run", "server"]