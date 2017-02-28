var json_ru = require('./mock.products.ru.json');
var json_en = require('./mock.products.en.json');

var express = require('express');
var app = express();

function filterProducts(json, res, idList, page, count) {
  const start = (page - 1) * count;
  const end = start + count;

  res.send(idList ? {products: json.products.filter(p => idList.includes(p.id)).map(p => {
      return {
        id: p.id,
        name: p.name,
        description: p.description
      }
    }),
    total: json.products.filter(p => idList.includes(p.id)).length} : 
    {
      products: json.products.filter(p => p.quantity > 0).slice(start, end),
      total: json.products.filter(p => p.quantity > 0).length
    });
}

app.get('/api/products', function (req, res) {
  var lang = req.param('lang'),
      idList = req.param('idList'),
      page = req.param('page'),
      count = req.param('count');

  setTimeout(function () {
    switch (lang) {
      case 'en':
        filterProducts(json_en, res, idList, page, count);
        break;
      case 'ru':
        filterProducts(json_ru, res, idList, page, count);
        break;
      default:
        filterProducts(json_en, res, idList, page, count);
    }
  }, 2000);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})