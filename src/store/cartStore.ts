import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string; // productId or productId-variantId
  productId: string;
  variantId: string | null;
  variantLabel: string | null;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: {
    productId: string;
    variantId?: string | null;
    variantLabel?: string | null;
    name: string;
    price: number;
    imageUrl: string | null;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        const cartId = product.variantId
          ? `${product.productId}-${product.variantId}`
          : product.productId;
        const existingItem = items.find((item) => item.id === cartId);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === cartId
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: cartId,
                productId: product.productId,
                variantId: product.variantId || null,
                variantLabel: product.variantLabel || null,
                name: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl,
              },
            ],
          });
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "rizquna-cart",
    },
  ),
);
