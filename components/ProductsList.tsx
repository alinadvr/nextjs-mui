import { Container, Grid } from "@mui/material";

import { Product } from "@/helpers/types";

import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

export default function ProductsList({
  products,
  page,
  productsPerPage,
  productsCount,
}: {
  products: Product[];
  page: number;
  productsPerPage: number;
  productsCount: number;
}) {
  return (
    <Container maxWidth="md" sx={{ mb: 10 }}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={8}
        columns={{ xs: 1, md: 2 }}
        sx={{ mb: 8, justifyContent: { xs: "center", md: "start" } }}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs={1} sx={{ maxWidth: 400 }}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(productsCount / productsPerPage)}
        defaultPage={page}
      />
    </Container>
  );
}
