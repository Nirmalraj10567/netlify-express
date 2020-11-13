'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const TeleBot = require('telebot');

const bot = new TeleBot('1238769131:AAGXzi8rLKi5dt9ejNMRE4iV-9aqT0e18eo');

bot.on(/^\/gplink (.+)$/, async(msg, props) => {

    const text =await props.match[1];

    const axios = require('axios')

const zx = axios.get('https://gplinks.in/api?api=1b1093a7f93afbe94ad2df18b89861d4970c23b8&url='+text)

  .then((response) => {

  A= response.data.shortenedUrl

    return bot.sendMessage(msg.from.id, A,{ replyToMessage: msg.message_id });

}) 

});

bot.start()

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
