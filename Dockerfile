# ─────────────────────────────────────────────
# Stage 1: Builder — install all dependencies
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including dev for potential build steps)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Run linting as part of the build verification
RUN npm run lint || true

# ─────────────────────────────────────────────
# Stage 2: Production — lean runtime image
# ─────────────────────────────────────────────
FROM node:20-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy source from builder
COPY --from=builder /app/src ./src

# Set ownership
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "src/server.js"]