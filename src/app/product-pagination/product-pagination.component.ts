import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.css']
})
export class ProductPaginationComponent implements OnInit {
  currentPage: number = 4;

  constructor() { }

  ngOnInit() {
  }

}
