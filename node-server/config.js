
const config = {};
config.privateKey = "secretKey";
config.dbPort="27017";
config.dbName="Chart";
config.dbHost="localhost"
config.mongoDB_url = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = config;
