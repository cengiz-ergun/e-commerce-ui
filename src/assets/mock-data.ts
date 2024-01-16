import { Brand } from "@app/_models/enums/brand";
import { Currency } from "@app/_models/enums/currency";
import { Gender } from "@app/_models/enums/gender";
import { SuitColour } from "@app/_models/enums/suit-colour";
import { Suit } from "@app/_models/suit";

export const mockData: Suit[] = [
    {
      id: 1,
      gender: Gender.Men,
      price: 150,
      currency: Currency.TL,
      primaryInfo: 'Slim Fit Suit',
      secondaryInfo: 'Perfect for formal occasions',
      sizes: [36, 38, 40, 42, 44],
      colour: SuitColour.Black,
      brand: Brand.Limehaus,
      available: true,
      imgPaths: ['path/to/image1', 'path/to/image2']
    },
    {
      id: 2,
      gender: Gender.Men,
      price: 120,
      currency: Currency.TL,
      primaryInfo: 'Classic Red Suit',
      secondaryInfo: 'Ideal for special events',
      sizes: [6, 8, 10, 12, 14],
      colour: SuitColour.Red,
      brand: Brand.MarcyDarcy,
      available: false,
      imgPaths: ['path/to/image3', 'path/to/image4']
    },
    {
      id: 3,
      gender: Gender.Men,
      price: 180,
      currency: Currency.TL,
      primaryInfo: 'Modern Blue Suit',
      secondaryInfo: 'Suitable for business meetings',
      sizes: [38, 40, 42, 44, 46],
      colour: SuitColour.Blue,
      brand: Brand.Farah,
      available: true,
      imgPaths: ['path/to/image5', 'path/to/image6']
    },
    {
      id: 4,
      gender: Gender.Men,
      price: 200,
      currency: Currency.TL,
      primaryInfo: 'Elegant White Suit',
      secondaryInfo: 'Perfect for weddings',
      sizes: [8, 10, 12, 14, 16],
      colour: SuitColour.White,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ['path/to/image9', 'path/to/image10']
    },
    {
      id: 5,
      gender: Gender.Men,
      price: 160,
      currency: Currency.TL,
      primaryInfo: 'Casual Grey Suit',
      secondaryInfo: 'Great for casual events',
      sizes: [40, 42, 44, 46, 48],
      colour: SuitColour.Gray,
      brand: Brand.Limehaus,
      available: false,
      imgPaths: ['path/to/image11', 'path/to/image12']
    },
    {
      id: 6,
      gender: Gender.Men,
      price: 140,
      currency: Currency.TL,
      primaryInfo: 'Chic Pink Suit',
      secondaryInfo: 'Adds a touch of elegance',
      sizes: [6, 8, 10, 12, 14],
      colour: SuitColour.Pink,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ['path/to/image13', 'path/to/image14']
    },
    {
      id: 7,
      gender: Gender.Men,
      price: 190,
      currency: Currency.TL,
      primaryInfo: 'Classic Blue Suit',
      secondaryInfo: 'Timeless and sophisticated',
      sizes: [42, 44, 46, 48, 50],
      colour: SuitColour.Blue,
      brand: Brand.Farah,
      available: true,
      imgPaths: ['path/to/image15', 'path/to/image16']
    },
    {
      id: 8,
      gender: Gender.Men,
      price: 180,
      currency: Currency.TL,
      primaryInfo: 'Stylish Blue Suit',
      secondaryInfo: 'Versatile and elegant',
      sizes: [8, 10, 12, 14, 16],
      colour: SuitColour.Blue,
      brand: Brand.MarcyDarcy,
      available: false,
      imgPaths: ['path/to/image17', 'path/to/image18']
    },
    {
      id: 9,
      gender: Gender.Men,
      price: 220,
      currency: Currency.TL,
      primaryInfo: 'Sophisticated Beige Suit',
      secondaryInfo: 'Ideal for upscale events',
      sizes: [44, 46, 48, 50, 52],
      colour: SuitColour.Green,
      brand: Brand.Limehaus,
      available: true,
      imgPaths: ['path/to/image19', 'path/to/image20']
    },
    {
      id: 10,
      gender: Gender.Men,
      price: 160,
      currency: Currency.TL,
      primaryInfo: 'Casual red Suit',
      secondaryInfo: 'A trendy and casual option',
      sizes: [6, 8, 10, 12, 14],
      colour: SuitColour.Red,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ['path/to/image21', 'path/to/image22']
    },
  ];