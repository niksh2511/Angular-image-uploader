import { generateFakeList, generateFakeProduct } from "../helper-functions/generate-products";
import { ProductModel } from "./product.model";

export class ProductState {
    
    products: ProductModel[] = generateFakeList(generateFakeProduct);
    
}