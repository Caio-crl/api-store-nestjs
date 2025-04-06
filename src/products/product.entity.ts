export class Product {
  id: string;
  name: string;
  value: number;
  quantity: number;
  description: string;
  characteristics: { name: string; description: string }[];
  images: { url: string; description: string }[];
  categories: string;
}

