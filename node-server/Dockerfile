FROM node:14.15.4
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN ls -al
RUN npm install
EXPOSE 3001
CMD ["node", "index.js"]



