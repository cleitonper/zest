# Set node:alpine image
FROM node:alpine

# Copy from host to container workdir
WORKDIR /app
COPY . .

# Install git
RUN apk add --update git

# Prepend node path for each npm call
# Install PM2
# Install project dependencies
RUN npm config set scripts-prepend-node-path true &&\
    npm install --global pm2@latest &&\
    npm install

# Set 8000 as container port
EXPOSE 8000

# Start the app
CMD [ "npm", "start" ]