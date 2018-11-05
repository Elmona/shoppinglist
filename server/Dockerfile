FROM node:8.11.3-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python

ADD package.json /tmp/package.json
RUN cd /tmp && npm install -qy
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app/

WORKDIR /usr/src/app/
EXPOSE 3001

RUN apk del native-deps

CMD ["npm", "start"]