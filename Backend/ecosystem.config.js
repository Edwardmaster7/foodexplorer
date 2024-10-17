module.exports = {
  apps: [{
    name: "foodxplorer_api",
    script: "./src/server.js",
    instances: max,
    // exec_mode: "fork",
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
