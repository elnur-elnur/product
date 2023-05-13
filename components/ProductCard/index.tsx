import { IProduct } from "@/interfaces/product";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {product.title}
        </Typography>
        <Typography variant="body2">{product.description}</Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <Button>Price: {product.price}</Button>
        <Button>Rating: {product.rating}</Button>
        <Button>Brand: {product.brand}</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
