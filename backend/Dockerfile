FROM node:14.7.6

WORKDIR /Mulava/backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

USER node

CMD [ "node", "server.js" ]