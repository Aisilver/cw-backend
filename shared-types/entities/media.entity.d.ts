import { EntityBase } from "./common";

export interface Media extends EntityBase {
    name: string,
    size: number,
    ext: string
}