import { IProduct } from "@/interfaces/product";
import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "../ProductCard";

const ProductsList = ({ products }: { products: IProduct[] }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
