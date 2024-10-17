module.exports = {
  apps: [{
    name: "foodxplorer_api",
    script: "./src/server.js",
    instances: "max",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
