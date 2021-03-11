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
    },
    apiOriginAllow: {
    allowCors: true,
    allowOrigin: "*",
    allowMethods: "OPTIONS, GET, POST",
    allowHeaders: "*"
  }
});

console.log(ws);

cron.schedule('* * * * *', () => {
  console.log(ws.httpApi.io.engine.clientsCount);
});
