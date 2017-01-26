import { Product } from './product.model';

export class CartProduct {
    private product: Product;
    private quantity?: number;

    constructor(product: Product) {
        this.product = product;
        this.quantity = 1;
    }
}