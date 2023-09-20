FROM node:latest

#Set our work directory
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app

#Install dependencies
COPY package.json /usr/src/app 
RUN npm install

# Copy all files.
COPY . /usr/src/app 

EXPOSE 3000
CMD ["npm", "run", "dev"]