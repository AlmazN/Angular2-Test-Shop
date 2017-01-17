var express = require('express');
var app = express();
var json = {
  "products":  [
    {
      "id": 1,
      "name": "Товар 1",
      "description": "Описание товара 1",
      "price": "34.25",
      "quantity": 105,
      "imageURL": "http://placehold.it/150/dff9f6"
    },
    {
      "id": 2,
      "name": "Товар 2",
      "description": "Описание товара 2",
      "price": "2.00",
      "quantity": 999,
      "imageURL": "http://placehold.it/150/dff9f6"
    },
    {
      "id": 3,
      "name": "Товар 3",
      "description": "Описание товара 3",
      "price": "12.15",
      "quantity": 0,
      "imageURL": "http://placehold.it/150/dff9f6"
    }
  ]
};

app.get('/api/products', function(req, res) {
    res.send(json);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})