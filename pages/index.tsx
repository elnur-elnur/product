import ProductsList from "@/components/ProductsList";
import { IProduct } from "@/interfaces/product";
import {
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import { Inter } from "next/font/google";
import { useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: { products: IProduct[] } }) {
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number[]>([0, 5000]);

  const memoziedBrands = useMemo<string[]>(() => {
    return [
      ...new Set(data.products.map((product: IProduct) => product.brand)),
    ];
  }, []);

  const memoziedPrice = useMemo<number[]>(() => {
    const prices = data.products.map((product) => product.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, []);

  const handleChangeBrand = (e: SelectChangeEvent) => {
    setBrand(e.target.value);

    setfilteredProducts(
      data.products.filter(
        (product: IProduct) => product.brand === e.target.value
      )
    );
  };

  const handleChangePrice = (value: number[]) => {
    setPrice(value);
    setfilteredProducts(
      data.products.filter(
        (product: IProduct) =>
          product.price >= price[0] && product.price <= price[1]
      )
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

          <Divider sx={{ my: 2 }}></Divider>

          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={price}
            valueLabelDisplay="auto"
            disableSwap
            min={memoziedPrice[0]}
            max={memoziedPrice[1]}
            onChangeCommitted={(_, value) =>
              handleChangePrice(value as number[])
            }
          />

          <Divider sx={{ my: 2 }}></Divider>
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
