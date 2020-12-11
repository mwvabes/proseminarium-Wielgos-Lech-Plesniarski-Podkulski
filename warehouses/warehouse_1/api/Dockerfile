FROM node:10
# USER node

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 8005

CMD [ "web.js" ]