# news-app
Application that can get you news from around the world and update every 30 seconds. 

## Setting up the development environment
I am using docker to setup the development environment.

### Setting up docker on Mac
```
# Installing docker
brew install docker docker-compose docker-machine
# Creating a docker machine called dev
docker-machine create dev --virtualbox-memory 8096 --virtualbox-disk-size 100000
```

### Building / Resetting docker services
```
# Removing any unused volume, images, containers
docker system prune -f

# Cloning the repository
cd /path/to/projects
git clone https://github.com/dkafewou/news-app.git
cd ./news-app

# Building docker images, this might take a while for the first time
docker-compose build
```

### Running docker
```
# Run the docker services
docker-compose up
```

Now point the browser to `http://localhost:9090` and wait for 30 second to see the feeds update itself.