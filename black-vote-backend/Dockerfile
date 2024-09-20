FROM node:20

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 3000 8545

CMD ["yarn", "start"]
