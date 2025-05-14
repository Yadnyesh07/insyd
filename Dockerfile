FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy backend and frontend
COPY backend ./backend
COPY frontend ./frontend

# Build backend and frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start:backend"]
