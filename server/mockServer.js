var json_ru = require('./mock.products.ru.json');
var json_en = require('./mock.products.en.json');

var express = require('express');
var app = express();

function filterProducts(json, res, idList, page, count) {
  const start = (page - 1) * count;
  const end = page * count;
  let result = {}, filtredList;

  if(idList) {
    filtredList = json.products.filter(p => p.quantity > 0).filter(p => idList.includes(p.id));
    result.products = filtredList.map(p => {
      return {
        id: p.id,
        name: p.name,
        description: p.description
      }
    });
  } else {
    filtredList = json.products.filter(p => p.quantity > 0);
    result.products = filtredList.slice(start, end);
  }
  result.total = filtredList.length;
  res.send(result);
}

app.get('/api/products', function (req, res) {
  var lang = req.query['lang'],
      idList = req.query['idList'],
      page = req.query['page'],
      count = req.query['count'];

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