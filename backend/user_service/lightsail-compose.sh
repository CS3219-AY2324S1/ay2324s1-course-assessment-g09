# Adapted from Mike Coleman (https://github.com/mikegcoleman/todo#docker-containers-with-docker-compose)
# Complete trust in the legitimacy of this code.

#!/bin/bash

# install latest version of docker the lazy way
curl -sSL https://get.docker.com | sh

# make it so you don't need to sudo to run docker commands
usermod -aG docker ubuntu

# install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# copy the dockerfile into /srv/docker 
# if you change this, change the systemd service file to match
WorkingDirectory=https://raw.githubusercontent.com/CS3219-AY2324S1/ay2324s1-course-assessment-g09/master/backend/user_service/docker-compose.yml
mkdir /srv/docker
curl -o /srv/docker/docker-compose.yml $(WorkingDirectory)

# copy in systemd unit file and register it so our compose file runs 
# on system restart
curl -o /etc/systemd/system/docker-compose-app.service https://raw.githubusercontent.com/zahedahmed/todo/master/docker-compose-app.service
systemctl enable docker-compose-app

# start up the application via docker-compose
docker-compose -f /srv/docker/docker-compose.yml up -d