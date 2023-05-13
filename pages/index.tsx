import ProductsList from "@/components/ProductsList";
import { IProduct } from "@/interfaces/product";
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Inter } from "next/font/google";
import { useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: { products: IProduct[] } }) {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [brand, setBrand] = useState("");

  const memoziedBrands = useMemo<string[]>(() => {
    return [
      ...new Set(data.products.map((product: IProduct) => product.brand)),
    ];
  }, []);

  const handleChangeBrand = (e: SelectChangeEvent) => {
    setBrand(e.target.value);

    setfilteredProducts(
      data.products.filter((product) => product.brand === e.target.value)
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Brand</InputLabel>
            <Select
              id="demo-simple-select"
              value={brand}
              label="Age"
              onChange={handleChangeBrand}
            >
              {memoziedBrands.map((brand: any) => {
                return (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Products
          </Typography>

          <ProductsList
            products={
              filteredProducts.length ? filteredProducts : data.products
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  if (!res.ok) {
    throw new Error("ugursuz request");
  }

  return { props: { data } };
}
