FROM node:14

WORKDIR /usr/src/app

RUN chown -R node:node /usr/src/app

USER node

COPY --chown=node:node . .

RUN npm ci --only-production

CMD npm start
