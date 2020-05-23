# Pulls the current node version from docker hub
FROM node:latest

# Creates an app directory inside the image
WORKDIR /usr/src/app

# Copy the app dependencies
COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

# Copy source code to image
COPY . .

# Expose the port we're working with
EXPOSE 9000
EXPOSE 9001

# Run the command to start node app
CMD [ "pm2-runtime", "app.js" ]
