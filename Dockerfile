# Set node:alpine image
FROM node:alpine

# Copy from host to container workdir
WORKDIR /app
COPY . .

# Install git
RUN apk add --update git

# Prepend node path for each npm or yarn call
# Install PM2
# Install project dependencies
RUN npm config set scripts-prepend-node-path true &&\
    yarn global add pm2 &&\
    yarn

# Set 8000 as container port
EXPOSE 8000

# Start the app
CMD [ "yarn", "start" ]