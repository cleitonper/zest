# Set node:alpine image
FROM node:10-alpine

# Copy from host to container workdir
WORKDIR /app
COPY . .

# Install git
RUN apk add --update git

# Prepend node path for each npm or yarn call
RUN npm config set scripts-prepend-node-path true

# Install PM2
RUN yarn global add pm2@latest

# Install project dependencies
# See yarn issue #6312
RUN yarn install --network-concurrency 1

# Set 8000 as container port
EXPOSE 8000

# Start the app
CMD [ "npm", "start" ]