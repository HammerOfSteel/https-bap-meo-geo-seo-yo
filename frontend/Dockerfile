FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps 2>/dev/null || npm install

# Copy environment file if it exists
COPY .env* ./

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start the dev server
CMD ["npm", "run", "dev"]
