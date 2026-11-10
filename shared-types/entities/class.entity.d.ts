export type ProductTypes = "lesson" | "activity"

export interface Class {
    name: string;
    type: ProductTypes;
    price: number;
}