FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

# copy local files to app folder
COPY . .

# Install dependencies
RUN yarn install
RUN yarn run build
RUN yarn run build:dll



EXPOSE 3000

CMD ["yarn","start"]