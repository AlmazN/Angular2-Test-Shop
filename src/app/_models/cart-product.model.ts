import { Product } from './product.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

export class CartProduct {
    product: Product;
    public quantitySubscription: Subscription;
    private _quantitySource? = new BehaviorSubject<number>(0);
    quantity$ = this._quantitySource.asObservable();

    get quantity(): number {
        return this._quantitySource.getValue();
    }

    set quantity(value: number) {
        value = Number(value);
        if(isNaN(value)) {
            value = 0;
        } else if(value > this.product.quantity) {
            value = this.product.quantity;
        }
        this._quantitySource.next(value);
    }

    constructor(product: Product, quantity: number = 1) {
        this.product = product;
        this._quantitySource.next(quantity);
    }
}