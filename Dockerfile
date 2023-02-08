# pull official base image
FROM node:18-alpine
# set working directory
WORKDIR /app
# copy package.json and package-lock.json to docker environment
COPY package.json ./
COPY package-lock.json ./
# install all node packages
RUN npm install
# copy everything over to docker environment
COPY . ./
# expost port
EXPOSE 3000
# start app
CMD ["npm", "start"]