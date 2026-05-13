module.exports = {
  apps: [
    {
      name: "autoreport",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      watch: false,
      max_memory_restart: "512M",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
      restart_delay: 5000,
      max_restarts: 10,
    },
  ],
};
