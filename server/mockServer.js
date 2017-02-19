var json_ru = require('./mock.products.ru.json');
var json_en = require('./mock.products.en.json');

var express = require('express');
var app = express();

function filterProducts(json, res, idList) {
  res.send(idList ? {products: json.products.filter(p => idList.includes(p.id))} : json);
}

app.get('/api/products', function (req, res) {
  var lang = req.param('lang'),
    idList = req.param('idList');

  setTimeout(function () {
    switch (lang) {
      case 'en':
        filterProducts(json_en, res, idList);
        break;
      case 'ru':
        filterProducts(json_ru, res, idList);
        break;
      default:
        filterProducts(json_en, res, idList);
    }
  }, 2000);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})