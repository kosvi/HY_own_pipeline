FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN rm package-lock.json && npm install

CMD ["npm", "start"]
