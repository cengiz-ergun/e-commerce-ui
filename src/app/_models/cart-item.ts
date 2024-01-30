import { Size } from "./enums/size";

export interface CartItem {
    primaryInfo: string;
    size: Size;
    price: number;
    firstImgPath: string;
    quantity: number;
}
