# Base Image
FROM node:14-alpine

WORKDIR /usr/src/app
# install dependencies
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3002

# Default command
CMD ["npm", "run", "dev"]

#to run container
#docker-compose up