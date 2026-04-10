export type Category = {
  id: number;
  name: string;
  sort_order: number;
};

export type Product = {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_best_seller: boolean;
  is_spicy: boolean;
  sort_order: number;
};

export type MenuCategory = Category & {
  products: Product[];
};