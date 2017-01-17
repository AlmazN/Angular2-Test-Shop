import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product/product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
  products: Product[];
  
  constructor (private productsServise: ProductsService) {
  }

  getProducts(): void {
    this.productsServise.getProducts().subscribe(products => this.products = products);
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
