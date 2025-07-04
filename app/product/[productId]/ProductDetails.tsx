/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: selectedImgType;
  quantity: number;
  price: number;
};

export type selectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {



  const{handleAddProductToCart,cartProducts}=useCart();
  const[isProductInCart,setIsProductInCart] = useState(false)
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const router=useRouter()

  useEffect(()=>{
    setIsProductInCart(false)
    if(cartProducts){
      const existingIndex = cartProducts.findIndex((item)=>item.id===product.id)

      if(existingIndex>-1){
        setIsProductInCart(true)
      }
    }
  },[cartProducts])

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;

  const handColorSelect = useCallback((value: selectedImgType) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: value,
    }));
  }, []);

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 1) return prev;
      return {
        ...prev,
        quantity: prev.quantity - 1,
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handColorSelect}></ProductImage>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In Stock" : "Out of stock"}
        </div>
        <Horizontal />
        {isProductInCart?(<>
        <p className="mb-2 text-stone-500 flex items-center gap-1">
          <MdCheckCircle className="text-teal-400" size={20}></MdCheckCircle>
          <span>Product Added to cart</span>
        </p>
        <div className="max-w-[300px]">
          <Button outline onClick={()=> {
            router.push('/cart')
          }} label="View Cart"></Button>
        </div>
        </>):(<>
          <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handColorSelect={handColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button label="Add To Cart" onClick={()=>handleAddProductToCart(cartProduct)}></Button>
        </div>
        </>)}
        
      </div>
    </div>
  );
};

export default ProductDetails;
