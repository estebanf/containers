FROM estebanf/alpine_java
RUN mkdir /ibpms_deploy
RUN mkdir /ibpms_rules
COPY deploy.tar.gz /ibpms_deploy
WORKDIR /ibpms_deploy
RUN tar -xvzf deploy.tar.gz .
RUN rm deploy.tar.gz
VOLUME /ibpms_deploy
VOLUME /ibpms_rules
CMD ["/bin/bash"]