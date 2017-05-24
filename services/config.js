var config = {};

config.services.port = port = process.env.PORT || 8080;
config.mongodb.db = "mongodb://localhost/tutoriel";

module.exports = config;
