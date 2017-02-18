var json_ru = require('./mock.products.ru.json');
var json_en = require('./mock.products.en.json');

var express = require('express');
var app = express();

function findByIdList(idList, array) {
  var result = [];
  idList = idList.split(',');

  array.forEach(function (product) {
    if (idList.includes(product.id)) {
      result.push(product);
    }
  });

  return result;
}

function filterProducts(json, idList, res) {
  var products = JSON.parse(json).products;

  if (idList) {
    products = findByIdList(idList, products);
  }
  res.send(products);
}

app.get('/api/products', function (req, res) {
  var lang = req.param('lang'),
    idList = req.param('idList');

  setTimeout(function () {
    switch (lang) {
      case 'en':
        filterProducts(json_en, idList, res);
        break;
      case 'ru':
        filterProducts(json_ru, idList, res);
        break;
      default:
        filterProducts(json_en, idList, res);
    }
  }, 2000);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})