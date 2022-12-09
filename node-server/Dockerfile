FROM node:16.18.1
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN ls -al
RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]



