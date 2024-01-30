import { Brand } from "./enums/brand";
import { Currency } from "./enums/currency";
import { Gender } from "./enums/gender";
import { Size } from "./enums/size";
import { SuitColour } from "./enums/suit-colour";

export interface Suit {
    _id?: string;
    gender: Gender;
    price: number;
    currency: Currency;
    primaryInfo: string;
    secondaryInfo: string;
    tertiaryInfo: string;
    sizes: Size[];
    colour: SuitColour;
    brand: Brand;
    available: boolean;
    imgPaths: string[];
    stock: number;
}
