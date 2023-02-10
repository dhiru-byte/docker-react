const PORT = 9000;
const HOST = '0.0.0.0';

const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('This NodeJs App is UP and Total Number of visits ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(PORT, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});