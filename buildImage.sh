#!/bin/sh

# Install docker, docker-compose and Node.

#clone node project..
git clone https://github.com/rohitCodeRed/mean-stack-docker-image.git

cd node-server

## build the image with docker file
docker build -t node_server_image .

cd ..

##remove folder
rm -rf node-server/

cd angular-app

npm install

npx -p @angular/cli@15.0.3 ng build

## build the image with docker file
docker build -t angular_app_image .

cd ..

##remove folder
rm -rf angular-app/

#pull official mongo image from docker
#docker pull mongo


