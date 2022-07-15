FROM node:16.14.2

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN rm package-lock.json || true
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start"]
