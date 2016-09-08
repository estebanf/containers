FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./RestServer /usr/src/app
RUN npm install
EXPOSE 3000
CMD [ "node","."]
