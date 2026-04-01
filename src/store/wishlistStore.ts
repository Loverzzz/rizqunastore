import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  items: string[]; // product IDs
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) => {
        const { items } = get();
        if (items.includes(id)) {
          set({ items: items.filter((i) => i !== id) });
        } else {
          set({ items: [...items, id] });
        }
      },
      isWishlisted: (id) => get().items.includes(id),
    }),
    { name: 'rizquna-wishlist' }
  )
);
