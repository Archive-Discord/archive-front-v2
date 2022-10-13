# Common build stage
FROM node:16.14.2

COPY . ./app

WORKDIR /app

COPY .env .env.production.local
RUN yarn
ENV NODE_ENV production
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]