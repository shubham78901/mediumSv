# Use Node.js version 20 as the base image
FROM node:20 

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build



# Expose port 80 (default HTTP port) for the NGINX server
EXPOSE 3000

# Command to start NGINX and serve the production build
CMD ["npm", "run", "start"]
