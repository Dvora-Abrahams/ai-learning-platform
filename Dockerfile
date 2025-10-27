FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install dependencies
RUN cd backend && npm install

# Copy backend source code
COPY backend/ ./backend/

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start", "--prefix", "backend"]