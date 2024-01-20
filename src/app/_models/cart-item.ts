import { Size } from "./enums/size";

export interface CartItem {
    id: number;
    size: Size;
    price: number;
    firstImgPath: string;
    quantity: number;
}
