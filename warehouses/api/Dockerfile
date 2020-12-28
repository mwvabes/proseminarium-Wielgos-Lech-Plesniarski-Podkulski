FROM node:10
# USER node

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install -g nodemon

RUN npm install

#COPY . .
COPY . .

EXPOSE 8005

# CMD [ "nodemon" ]
CMD [ "npm", "run", "start.dev" ]


