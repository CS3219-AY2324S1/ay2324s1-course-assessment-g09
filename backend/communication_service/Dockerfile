FROM node:latest

# Set our app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY .env .env

ENV PORT=${PORT}
# Install dependencies
COPY package*.json /usr/src/app/
RUN npm ci # Install dependencies of CONSISTENT version to ensure reliability

# Copy all source code
COPY . /usr/src/app


EXPOSE ${PORT}

CMD [ "npm", "run", "start"]