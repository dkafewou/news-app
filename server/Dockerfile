FROM node:8.15.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /home/src/news-app/server
WORKDIR /home/src/news-app/server

COPY package*.json /home/src/news-app/server

RUN npm install

COPY . /home/src/news-app/server

CMD ["npm", "start"]
