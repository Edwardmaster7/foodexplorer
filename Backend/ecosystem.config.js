module.exports = {
  apps: [{
    name: "foodxplorer_api",
    script: "./src/server.js",
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
