module.exports = {
  apps: [{
    name: "foodxplorer_api",
    script: "./src/server.js",
    instances: "max",
    watch: false,
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
    }
  }]
};