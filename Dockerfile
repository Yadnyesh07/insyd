FROM node:18-alpine

WORKDIR /app

# Copy entire project
COPY . .

# Install root dependencies
RUN npm install

# Install backend and frontend dependencies
RUN npm run install:backend && npm run install:frontend

# Build backend and frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start:backend"]
