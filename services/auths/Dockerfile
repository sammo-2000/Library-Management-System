# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set up SQLite DB
RUN npx prisma db push

# Build the NestJS application
RUN npm run build

# Expose port 3004
EXPOSE 3002

# Run the application
CMD ["npm", "run", "start:prod"]