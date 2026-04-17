export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  canDelete: boolean;
  productCount: number;
}

export interface Product {
  id: number;
  name: string;
  model: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  imageUrl: string;
  isFavorite: boolean;
  canDelete: boolean;
  createdAt: string;
  category: Category;
}
export interface Brands {
    brands : string[]
}



