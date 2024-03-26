# Use Node.js official image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port 3001 to the outside once the container has launched
EXPOSE 3001

# Command to run the app
CMD ["npm", "start"]
