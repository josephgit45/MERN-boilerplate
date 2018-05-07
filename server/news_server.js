const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;


// Configuration
// ================================================================================================


const app = express();


const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('4c6d0c8e7613400b8dc847d83ab5c4df');

var news_data;
var counter = 0;

function retrieveNews(){
  counter++;
  console.log("fetching new news - " + counter);
  newsapi.v2.everything({
    sources: 'abc-news,espn,business-insider,mashable,national-geographic,newsweek,reuters,techcrunch,mtv-news,the-huffington-post,usa-today,time,the-verge',
    language: 'en',
    pageSize: 10
}).then(response => {
    console.log(JSON.stringify(response,null,2) + "\n\n");
    news_data = response;
});
} 
retrieveNews();
setInterval(retrieveNews, 360000);


// app.get('/', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '../index.html'));
// })
app.get('/news_data', function (req, res) {
    res.send("counter: " + counter + "<br/>" + JSON.stringify(news_data,null,2));
})


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;