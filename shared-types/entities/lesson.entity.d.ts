export type ProductTypes = "lesson" | "activity"

export interface ProductEntity {
    name: string;
    type: ProductTypes;
    price: number;
}