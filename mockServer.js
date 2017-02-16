var json_ru = require('./server/mock.products.ru.json');
var json_en = require('./server/mock.products.en.json');

var express = require('express');
var app = express();


app.get('/api/products', function(req, res) {
  var lang = req.param('lang');
  setTimeout(function() {
  switch (lang) {
    case 'en': 
      res.send(json_en);
      break;
    case 'ru':
      res.send(json_ru);
      break;
    default:
      res.send(json_en);
  }
  }, 2000);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})