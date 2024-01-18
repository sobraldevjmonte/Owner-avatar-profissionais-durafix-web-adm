module.exports = {
  apps: [
    {
      name: 'NuxtDurafixProfAdm',
      exec_mode: 'cluster', // Optional: If you want it run multiple instances.
      instances: 'max', // Or a number of instances.
      // 'max' auto detects how many CPU cores there are.
      // The previous option must exist to use the above.
      script: '../api_durafixadm/prof/node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
}

//https://stackoverflow.com/questions/51875055/how-to-run-nuxt-under-pm2
//https://cloudo3.com/pt/computacao-em-nuvem/configurar-um-aplicativo-web-nuxt-js-no-ubuntu-18-04-lts/1615