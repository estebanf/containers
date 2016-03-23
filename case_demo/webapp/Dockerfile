FROM nodesource/node:4.0
ADD case_demo_webapp/dist/ .
ADD start_production.sh start_production.sh
ENV NODE_ENV production
RUN npm install
EXPOSE 80
WORKDIR /usr/src/app
RUN chmod +x start_production.sh
CMD ["/usr/src/app/start_production.sh"]