import { Store } from "rxjs-observable-store/lib/esm/store";
import { ProductState } from "./product-state";
import { ProductModel } from "./product.model";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ProductStore extends Store<ProductState> {

    constructor() {
        super(new ProductState());
    }


    // methods to create
    add = (product: ProductModel) => {

        this.setState({
            ...this.state,
            products: [...this.state.products, product],
        })
    }

    // methods to find
    find = (index: number): ProductModel | null => {
        return this.state.products[index] ? this.state.products[index] : null;
    }

    // method to edit
    edit = (product: ProductModel, index: number) => {

        let tempProductList = [...this.state.products];
        tempProductList[index] = product;

        this.setState({
            ...this.state,
            products: [...tempProductList],
        })
    }

    // method to delete 
    delete = (index: number) => {
        this.setState({
            ...this.state,
            products: this.state.products.filter((product, currIndex: number) => currIndex !== index),
        })
    }
}