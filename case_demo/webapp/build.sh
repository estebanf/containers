#!/bin/bash
cd case_demo_webapp
git pull origin master
npm install
bower install
grunt build --force
cd ..
docker build -t estebanf/case_demo_webapp .
