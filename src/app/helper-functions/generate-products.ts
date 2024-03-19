import { faker } from "@faker-js/faker";
import { ProductModel } from "../product-store/product.model";

export function generateFakeList(callback: any, noOfProducts: number = 10): ProductModel[] {
    return faker.helpers.multiple(callback, { count: noOfProducts });
}


export function generateFakeProduct(): ProductModel {
    return {
        name: faker.commerce.productName(),
        imgArr: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
        price: parseFloat(faker.commerce.price()),
        discount: Math.round(Math.random() * 99),
        size: Math.round(Math.random() * 4),
    }
}