export class Product {
    id: number;
    name: string;
    description: string;
    price: string;
    quantity: number;
    imageURL: string;

    constructor(id: number, name: string, description: string, price: string, quantity: number, imageURL: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageURL = imageURL;
    }
}