FROM node:18-alpine

WORKDIR /app

# Create necessary directories
RUN mkdir -p backend frontend

# Copy package files first
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install root dependencies
RUN npm install

# Install backend and frontend dependencies
WORKDIR /app/backend
RUN npm install

WORKDIR /app/frontend
RUN npm install

# Copy entire project
WORKDIR /app
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start:backend"]
