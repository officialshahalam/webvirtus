# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Copy source code
COPY . .

# Build TypeScript (if using TypeScript)
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Expose port (adjust based on your app)
EXPOSE 4000

# This runs: node dist/main.js
CMD ["npm", "start"]