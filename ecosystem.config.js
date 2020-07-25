module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/index.js',
      instances: 2,
      exec_mode: 'cluster'
    }
  ]
};
