import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/Product';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
          title: 'Sport Shoes',
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          title: 'Smart Watch',
        },
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
    }),
    {
      name: 'product-storage',
    }
  )
);