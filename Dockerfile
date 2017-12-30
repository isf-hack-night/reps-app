FROM node:9.3.0
WORKDIR /usr/app
COPY . .
RUN npm install --quiet
