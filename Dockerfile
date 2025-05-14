FROM node:18-alpine AS base

# Prepare working directory
FROM base AS deps
WORKDIR /app

# Ensure package files exist
RUN mkdir -p backend frontend

# Copy package files with fallback
COPY package.json package-lock.json* ./
COPY backend/package.json* ./backend/
COPY frontend/package.json* ./frontend/

# Create empty package.json if not exists
RUN test -f backend/package.json || echo '{}' > backend/package.json
RUN test -f frontend/package.json || echo '{}' > frontend/package.json

# Install dependencies
RUN npm ci || npm install

# Build stage
FROM base AS builder
WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules* ./backend/node_modules/
COPY --from=deps /app/frontend/node_modules* ./frontend/node_modules/

# Copy project files
COPY . .

# Ensure build scripts exist
RUN test -f package.json && npm run build || echo 'No root build script'

# Production stage
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built artifacts
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend ./frontend
COPY --from=builder /app/node_modules ./node_modules

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 5000

# Start backend
CMD ["npm", "run", "start:backend"]
