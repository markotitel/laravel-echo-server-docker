require('dotenv').config();
let cron = require('node-cron');
const env = process.env;

let ws = require('laravel-echo-server')

ws.run({
    authHost: env.APP_URL,
    authEndpoint: env.AUTH_ENDPOINT,
    devMode: env.APP_DEBUG,
    port: 6001,
    database: "redis",
    subscribers: {
        "redis": true,
        "http": false
    },
    databaseConfig: {
        redis: {
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
        }
    }
}).then(function() {
    red = ws.subscribers[0];
    red._redis.on('error', err => {
       console.log('REDIS: FAILED');
       process.exit(0);
    });
});


cron.schedule('* * * * *', () => {
  console.log(ws.httpApi.io.engine.clientsCount);
});
