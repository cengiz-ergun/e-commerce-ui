import { Brand } from "@app/_models/enums/brand";
import { Currency } from "@app/_models/enums/currency";
import { Gender } from "@app/_models/enums/gender";
import { Size } from "@app/_models/enums/size";
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
      sizes: [Size.XS, Size.M],
      colour: SuitColour.Black,
      brand: Brand.Limehaus,
      available: true,
      imgPaths: ["assets/img/suits/id-1/img-1.jpg", 'assets/img/suits/id-1/img-2.jpg', 'assets/img/suits/id-1/img-3.jpg', 'assets/img/suits/id-1/img-4.jpg']
    },
    {
      id: 2,
      gender: Gender.Men,
      price: 200,
      currency: Currency.TL,
      primaryInfo: 'Classic Red Suit',
      secondaryInfo: 'Ideal for special events',
      sizes: [Size.S, Size.L],
      colour: SuitColour.Red,
      brand: Brand.MarcyDarcy,
      available: false,
      imgPaths: ["assets/img/suits/id-2/img-1.jpg", 'assets/img/suits/id-2/img-2.jpg', 'assets/img/suits/id-2/img-3.jpg']
    },
    {
      id: 3,
      gender: Gender.Men,
      price: 400,
      currency: Currency.TL,
      primaryInfo: 'Modern Blue Suit',
      secondaryInfo: 'Suitable for business meetings',
      sizes: [Size.XS, Size.XXL],
      colour: SuitColour.Blue,
      brand: Brand.Farah,
      available: true,
      imgPaths: ["assets/img/suits/id-3/img-1.jpg", 'assets/img/suits/id-3/img-2.jpg', 'assets/img/suits/id-3/img-3.jpg']
    },
    {
      id: 4,
      gender: Gender.Men,
      price: 300,
      currency: Currency.TL,
      primaryInfo: 'Elegant White Suit',
      secondaryInfo: 'Perfect for weddings',
      sizes: [Size.L, Size.XL],
      colour: SuitColour.White,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ["assets/img/suits/id-4/img-1.jpg", 'assets/img/suits/id-4/img-2.jpg', 'assets/img/suits/id-4/img-3.jpg']
    },
    {
      id: 5,
      gender: Gender.Men,
      price: 450,
      currency: Currency.TL,
      primaryInfo: 'Casual Grey Suit',
      secondaryInfo: 'Great for casual events',
      sizes: [Size.S, Size.XXL],
      colour: SuitColour.Gray,
      brand: Brand.Limehaus,
      available: false,
      imgPaths: ["assets/img/suits/id-5/img-1.jpg", 'assets/img/suits/id-5/img-2.jpg', 'assets/img/suits/id-5/img-3.jpg']
    },
    {
      id: 6,
      gender: Gender.Men,
      price: 600,
      currency: Currency.TL,
      primaryInfo: 'Chic Pink Suit',
      secondaryInfo: 'Adds a touch of elegance',
      sizes: [Size.XS, Size.XL],
      colour: SuitColour.Pink,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ["assets/img/suits/id-6/img-1.jpg", 'assets/img/suits/id-6/img-2.jpg', 'assets/img/suits/id-6/img-3.jpg']
    },
    {
      id: 7,
      gender: Gender.Men,
      price: 800,
      currency: Currency.TL,
      primaryInfo: 'Classic Blue Suit',
      secondaryInfo: 'Timeless and sophisticated',
      sizes: [Size.L, Size.XXL],
      colour: SuitColour.Blue,
      brand: Brand.Farah,
      available: true,
      imgPaths: ["assets/img/suits/id-7/img-1.jpg", 'assets/img/suits/id-7/img-2.jpg', 'assets/img/suits/id-7/img-3.jpg']
    },
    {
      id: 8,
      gender: Gender.Men,
      price: 1200,
      currency: Currency.TL,
      primaryInfo: 'Stylish Blue Suit',
      secondaryInfo: 'Versatile and elegant',
      sizes: [Size.S, Size.M],
      colour: SuitColour.Blue,
      brand: Brand.MarcyDarcy,
      available: false,
      imgPaths: ["assets/img/suits/id-8/img-1.jpg", 'assets/img/suits/id-8/img-2.jpg', 'assets/img/suits/id-8/img-3.jpg']
    },
    {
      id: 9,
      gender: Gender.Men,
      price: 1400,
      currency: Currency.TL,
      primaryInfo: 'Sophisticated Beige Suit',
      secondaryInfo: 'Ideal for upscale events',
      sizes: [Size.S, Size.XXL],
      colour: SuitColour.Brown,
      brand: Brand.Limehaus,
      available: true,
      imgPaths: ["assets/img/suits/id-9/img-1.jpg", 'assets/img/suits/id-9/img-2.jpg', 'assets/img/suits/id-9/img-3.jpg']
    },
    {
      id: 10,
      gender: Gender.Men,
      price: 1800,
      currency: Currency.TL,
      primaryInfo: 'Casual red Suit',
      secondaryInfo: 'A trendy and casual option',
      sizes: [Size.S, Size.L],
      colour: SuitColour.Brown,
      brand: Brand.MarcyDarcy,
      available: true,
      imgPaths: ["assets/img/suits/id-10/img-1.jpg", 'assets/img/suits/id-10/img-2.jpg', 'assets/img/suits/id-10/img-3.jpg']
    },
  ];