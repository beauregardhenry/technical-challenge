#!/bin/bash

yum update -y
sudo su

yum install docker -y
systemctl enable docker.service
systemctl start docker.service
docker run -dp 80:8000 crccheck/hello-world
