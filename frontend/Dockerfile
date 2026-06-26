# Use the official Node.js runtime as parent image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package dependencies and install
COPY package*.json /app/
RUN npm install

# Copy the rest of the application
COPY . /app/

# Expose Vite dev server port
EXPOSE 5173

# Start Vite with --host flag so it binds to 0.0.0.0
CMD ["npm", "run dev", "--", "--host"]