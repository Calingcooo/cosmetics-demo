import { StaticImageData } from "next/image";

import productLipstick from "../../../public/assets/products/product-lipstick.jpg";
import productSerum from "../../../public/assets/products/product-serum.jpg";
import productPalette from "../../../public/assets/products/product-palette.jpg";
import productCream from "../../../public/assets/products/product-cream.jpg";
import productPerfume from "../../../public/assets/products/product-perfume.jpg";
import productBrushes from "../../../public/assets/products/product-brushes.jpg";

export interface ProductVariationOption {
  name: string;
  color?: string; // optional hex or CSS color value
}

export interface ProductVariation {
  name: string;
  options: ProductVariationOption[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string | StaticImageData;
  category: string;
  description: string;
  variations?: ProductVariation[];
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Velvet Rose Lipstick",
    price: 28.99,
    image: productLipstick,
    category: "Makeup",
    description:
      "A luxurious velvet-finish lipstick with rich color payoff that lasts all day. Infused with moisturizing ingredients for comfortable wear.",
    variations: [
      {
        name: "Shade",
        options: [
          { name: "Rose Pink", color: "#E88FB8" },
          { name: "Deep Rose", color: "#B04E6F" },
          { name: "Coral Rose", color: "#F88379" },
          { name: "Burgundy", color: "#800020" },
        ]
      },
      {
        name: "Finish",
        options: [
          { name: "Matte" },
          { name: "Satin" },
          { name: "Velvet" }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Radiance Face Serum",
    price: 45.99,
    image: productSerum,
    category: "Skincare",
    description:
      "Transform your skin with our powerful radiance serum. Packed with vitamin C and hyaluronic acid for a glowing complexion."
  },
  {
    id: 3,
    name: "Nude Dreams Palette",
    price: 52.99,
    image: productPalette,
    category: "Makeup",
    description:
      "The ultimate eyeshadow palette featuring 12 stunning nude shades. From matte to shimmer, create endless looks with this versatile collection.",
    variations: [
      {
        name: "Palette Type",
        options: [
          { name: "Warm Nudes", color: "#C49E85" },
          { name: "Cool Nudes", color: "#B0A8B9" },
          { name: "Rose Nudes", color: "#D8A7A7" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Luxury Moisturizer",
    price: 38.99,
    image: productCream,
    category: "Skincare",
    description:
      "Indulge your skin with our rich, luxurious moisturizer. Deeply hydrating formula that leaves skin soft, supple, and radiant."
  },
  {
    id: 5,
    name: "Rose Gold Perfume",
    price: 65.99,
    image: productPerfume,
    category: "Fragrance",
    description:
      "An enchanting floral fragrance with notes of rose, jasmine, and sandalwood. Elegant and long-lasting, perfect for any occasion.",
    variations: [
      {
        name: "Size",
        options: [
          { name: "30ml" },
          { name: "50ml" },
          { name: "100ml" }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Professional Brush Set",
    price: 42.99,
    image: productBrushes,
    category: "Tools",
    description:
      "Complete your makeup collection with this professional 10-piece brush set. Soft synthetic bristles for flawless application every time."
  },
  {
    id: 7,
    name: "Coral Blush Lipstick",
    price: 26.99,
    image: productLipstick,
    category: "Makeup",
    description:
      "A beautiful coral shade that complements all skin tones. Creamy formula with a satin finish for natural-looking lips."
  },
  {
    id: 8,
    name: "Hydrating Night Serum",
    price: 48.99,
    image: productSerum,
    category: "Skincare",
    description:
      "Overnight renewal serum that works while you sleep. Wake up to refreshed, plump, and hydrated skin every morning."
  },
];