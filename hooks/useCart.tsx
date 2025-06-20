/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount:number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFormCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent:string |null;
  handleSetPaymentIntent : (val:string|null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent , setPaymentIntent]= useState<string | null>(null)

  const [cartTotalAmount,setCartTotalAmount]= useState(0)

  // Load from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cartItems = localStorage.getItem("eShopCartItems");
    const eShopPaymentIntent:any = localStorage.getItem('eShopPaymentIntent')
    const paymentIntent : string|null=JSON.parse(eShopPaymentIntent)
    setPaymentIntent(paymentIntent)
    try {
      const parsedItems = cartItems ? JSON.parse(cartItems) : [];
      if (Array.isArray(parsedItems)) {
        setCartProducts(parsedItems);
        setCartTotalQty(parsedItems.length);
      } else {
        setCartProducts([]);
        setCartTotalQty(0);
      }
    } catch (error) {
      console.error("Failed to parse cart items", error);
      setCartProducts([]);
      setCartTotalQty(0);
    }
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;
            return acc;
          },
          {
            total: 0,
            qty: 0,
          }
        );
        setCartTotalQty(qty)
        setCartTotalAmount(total)
      }
    };
    getTotals();
  }, [cartProducts]);

  // Add to cart
  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      const updatedCart = cartProducts ? [...cartProducts, product] : [product];
      setCartProducts(updatedCart);
      setCartTotalQty(updatedCart.length);
      toast.success("Product added to cart");
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
    },
    [cartProducts]
  );

  // Remove from cart
  const handleRemoveProductFormCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProducts);
        setCartTotalQty(filteredProducts.length);
        toast.error("Product removed");
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  // Increase quantity
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 99) return toast.error("Oops! Maximum reached");

      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const index = updatedCart.findIndex((item) => item.id === product.id);
        if (index > -1) updatedCart[index].quantity++;
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  // Decrease quantity
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      if (product.quantity === 1) return toast.error("Oops! Minimum reached");

      if (cartProducts) {
        const updatedCart = [...cartProducts];
        const index = updatedCart.findIndex((item) => item.id === product.id);
        if (index > -1) updatedCart[index].quantity--;
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  // Clear cart
  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    toast.error("All products removed");
    localStorage.setItem("eShopCartItems", JSON.stringify([]));
  }, []);

  const handleSetPaymentIntent = useCallback((val:string|null)=>{
    setPaymentIntent(val)
    localStorage.setItem('eShopPaymentIntent',JSON.stringify(val))
  },[paymentIntent])

  const value = {
    cartTotalQty,
    cartProducts,
    cartTotalAmount,
    handleAddProductToCart,
    handleRemoveProductFormCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent
  };

  return <CartContext.Provider value={value} {...props} />;
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
