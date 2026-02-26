FROM node:18-alpine

WORKDIR /app

# Install OpenSSL required by Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install dependencies - try with legacy peer deps first
RUN npm install --legacy-peer-deps 2>/dev/null || npm install

# Copy source code and scripts
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# Make entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Expose port
EXPOSE 5000

# Run entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]
