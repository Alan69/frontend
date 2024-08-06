# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the React app using Vite
CMD ["npm", "start"]
