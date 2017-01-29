import { Product } from './product.model';

export class CartProduct {
    product: Product;
    quantity?: number;

    constructor(product: Product) {
        this.product = product;
        this.quantity = 1;
    }
}