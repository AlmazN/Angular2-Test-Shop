import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product/product.model';

let json = {
  "products": [
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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  
  constructor () {
    for (let product of json.products) {
      this.products.push(new Product(product.id, product.name, product.description, product.price, product.quantity, product.imageURL))
    }
  }

  ngOnInit() {
  }

}
