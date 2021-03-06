var config = {
  port: 8080,
  site: "http://localhost/#/",

  mongo: {
    hostname: "localhost",
    port: "27017",

    db: "jobPortal"
  },
  secretKey: "nilampawar"
};

config.mongo.url =
  "mongodb://" +
  config.mongo.hostname +
  ":" +
  config.mongo.port +
  "/" +
  config.mongo.db;

module.exports = config;
