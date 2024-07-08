FROM node:18-alpine

#Creating an app directory
WORKDIR /app

#Getting file with all dependencies
COPY package*.json ./

#Installing all the dependencies
RUN npm install

#Copying all source code to the /app directory
COPY . .

EXPOSE 5000

EXPOSE 443

CMD [ "npm", "start" ]