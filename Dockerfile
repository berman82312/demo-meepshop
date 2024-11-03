FROM node:20

WORKDIR /usr/server/app

COPY ./package.json ./
RUN npm install && npm i -g tpx

COPY ./ .
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run" ,"start"]