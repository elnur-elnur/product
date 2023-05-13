import ProductsList from "@/components/ProductsList";
import { IProduct } from "@/interfaces/product";
import { Container, Grid, Typography } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }: { data: {products: IProduct[]} }) {
  return (
    <Container sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>left</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>right</Typography>

          <ProductsList products={data.products} />
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
