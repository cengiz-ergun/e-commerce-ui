import { Brand } from "./enums/brand";
import { Currency } from "./enums/currency";
import { Gender } from "./enums/gender";
import { SuitColour } from "./enums/suit-colour";

export interface Suit {
    id: number;
    gender: Gender;
    price: number;
    currency: Currency;
    primaryInfo: string;
    secondaryInfo: string;
    sizes: number[];
    colour: SuitColour;
    brand: Brand;
    available: boolean;
    imgPaths: string[];
}
