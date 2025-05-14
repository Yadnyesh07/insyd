FROM node:18-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN npm run install:backend
RUN npm run install:frontend

# Copy entire project
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start:backend"]
