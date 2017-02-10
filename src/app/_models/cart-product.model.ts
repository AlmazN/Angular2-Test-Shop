import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class CartProduct {
    product: Product;
    private _quantitySource? = new BehaviorSubject<number>(0);
    quantity$ = this._quantitySource.asObservable();

    get quantity(): number {
        return this._quantitySource.getValue();
    }

    set quantity(newQuantity: number) {
        this._quantitySource.next(newQuantity);
    }

    constructor(product: Product) {
        this.product = product;
    }
}