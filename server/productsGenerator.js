let fs = require('fs'),
    faker = require('faker');

let objRu = {
  products: []
},
objEn = {
  products: []
};

for(i = 1; i <= 100; i++) {
  let generatedPrice = faker.random.number(5000),
      generatedQuantity = faker.random.number(5000),
      random = Math.random() * 10;
      faker.locale = "ru";

  objRu.products.push({
    id: i,
    name: random > 5 ? random < 8 ? faker.commerce.product() : `${faker.commerce.productAdjective()} ${faker.commerce.product()}`
    : random > 2 ? `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} ${faker.commerce.product()}`: 
    `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.product()}`,
    description: faker.lorem.paragraph(),
    price: generatedPrice,
    quantity: random > 2 ? generatedQuantity : 0,
    imageURL: "http://placehold.it/150/dff9f6"
  });

  faker.locale = "en";

  objEn.products.push({
    id: i,
    name: random > 5 ? random < 8 ? faker.commerce.product() : `${faker.commerce.productAdjective()} ${faker.commerce.product()}`
    : random > 2 ? `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} ${faker.commerce.product()}`: 
    `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} ${faker.commerce.product()} ${faker.commerce.product()}`,
    description: faker.lorem.paragraph(),
    price: generatedPrice,
    quantity: random > 2 ? generatedQuantity : 0,
    imageURL: "http://placehold.it/150/dff9f6"
  });
}

let jsonRu = JSON.stringify(objRu),
    jsonEn = JSON.stringify(objEn);

fs.writeFile('server/mock.products.ru.json', jsonRu, err => {
  if(err) {
    throw err;
  }
});
fs.writeFile('server/mock.products.en.json', jsonEn, err => {
  if(err) {
    throw err;
  }
});


