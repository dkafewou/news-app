FROM node:8.15.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /home/src/news-app/client
WORKDIR /home/src/news-app/client

COPY package*.json /home/src/news-app/client

RUN npm install

COPY . /home/src/news-app/client

CMD ["npm", "run", "watch-dev"]
