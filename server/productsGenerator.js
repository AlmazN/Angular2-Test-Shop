let fs = require('fs'),
    FakeratorRu = require('fakerator'),
    FakeratorEn = require('fakerator'),
    fakeratorRu = FakeratorRu('ru-RU'),
    fakeratorEn = FakeratorEn(); //en-EN

let objRu = {
  products: []
},
objEn = {
  products: []
};

for(i = 1; i <= 100; i++) {
  let generatedPrice = fakeratorRu.random.number(1,9999),
      generatedQuantity = fakeratorRu.random.number(0, 9999);

  objRu.products.push({
    id: i,
    name: fakeratorRu.lorem.word(),
    description: fakeratorRu.lorem.paragraph(),
    price: generatedPrice,
    quantity: generatedQuantity,
    imageURL: "http://placehold.it/150/dff9f6"
  });

  objEn.products.push({
    id: i,
    name: fakeratorEn.lorem.word(),
    description: fakeratorEn.lorem.paragraph(),
    price: generatedPrice,
    quantity: generatedQuantity,
    imageURL: "http://placehold.it/150/dff9f6"
  });
}

let jsonRu = JSON.stringify(objRu),
    jsonEn = JSON.stringify(objEn);

fs.writeFile('server/mock.products.ru.json', jsonRu);
fs.writeFile('server/mock.products.en.json', jsonEn);


