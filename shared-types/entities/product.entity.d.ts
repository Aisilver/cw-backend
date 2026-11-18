export type ProductTypes = "lesson" | "activity"

export interface Product {
    name: string;
    type: ProductTypes;
    price: number;
    description: string;
}