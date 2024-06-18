import {
  Button,
  CardActions,
  Container,
  Typography,
  CardMedia,
  CardContent,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Image from "next/image";

import getProduct from "@/helpers/getProduct";
import { products } from "@/mockdata";

import QuantityInput from "@/components/QuantityInput";
import Error from "@/components/Error";

export async function generateMetadata({
  params,
}: {
  params: { productLink: string };
}) {
  const res = await getProduct(params.productLink);
  if (res.isError) return { title: "Product Not Found" };
  return { title: res.data.title, description: res.data.description };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productLink: product.link,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { productLink: string };
}) {
  const res = await getProduct(params.productLink);

  if (res.isError)
    return <Error message={res.message} buttons={{ back: true }} />;

  const { title, image, description, price } = res.data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    image,
    description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          columnGap: 8,
          rowGap: 4,
          my: 5,
        }}
      >
        <CardMedia
          sx={{
            position: "relative",
            height: 500,
            width: { xs: "90%", md: 500 },
          }}
          title={title}
        >
          <Image
            src={image}
            alt={title}
            style={{ objectFit: "contain" }}
            sizes="(max-width: 900px) 500px, 90vw"
            fill
            priority
            quality={100}
          />
        </CardMedia>
        <CardContent>
          <Breadcrumbs sx={{ mb: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="inherit">Products</Typography>
            <Typography color="text.primary">{title}</Typography>
          </Breadcrumbs>
          <Typography gutterBottom variant="h3" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h5" component="p" mt={3} fontWeight={600}>
            {price}$
          </Typography>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              px: 0,
            }}
          >
            <QuantityInput />
            <Button size="large" variant="contained">
              Add to Cart
            </Button>
          </CardActions>
        </CardContent>
      </Container>
    </>
  );
}
