#!/bin/sh

#run build image script
sh buildImage.sh

## Finally run deployment script...
docker-compose up