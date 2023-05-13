import { IProduct } from "@/interfaces/product";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return <div>{product.price}</div>;
};

export default ProductCard;
