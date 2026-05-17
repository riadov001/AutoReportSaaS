module.exports = {
  apps: [
    {
      name: "autoreport",
      script: "./server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        PUBLIC_BASE_URL: "https://auto-report.replit.app",
      },
      watch: false,
      max_memory_restart: "256M",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_file: "./logs/pm2-combined.log",
      time: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
