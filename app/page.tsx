import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import getProducts from "@/helpers/getProducts";

import ProductsList from "@/components/ProductsList";
import Error from "@/components/Error";

export const metadata = {
  title: "Pixel Pulse",
  description:
    "Discover a wide selection of the latest video games, consoles, accessories, and gaming merchandise. Enjoy fast shipping, secure shopping, and excellent customer service",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const productsPerPage = 4;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (isNaN(page)) redirect("/");

  const res = await getProducts({
    skip: (page - 1) * productsPerPage,
    take: productsPerPage,
  });

  if (res.isError) return <Error message={res.message} />;

  if (
    res.data.count !== 0 &&
    Math.ceil(res.data.count / productsPerPage) < page
  )
    redirect("/");

  return (
    <>
      <Typography
        sx={{
          fontWeight: 500,
          textAlign: "center",
          py: 8,
        }}
        variant="h3"
        component="h1"
        style={{ background: `linear-gradient(${pink[100]}, #fff)` }}
      >
        Level up your game with{" "}
        <Typography
          component="span"
          color="primary.main"
          variant="h3"
          sx={{ fontWeight: 500 }}
        >
          Pixel Pulse
        </Typography>{" "}
        – where gamers shop!
      </Typography>
      {res.data.products.length > 0 ? (
        <ProductsList
          products={res.data.products}
          page={page}
          productsPerPage={productsPerPage}
          productsCount={res.data.count}
        />
      ) : (
        <Typography color="grey.300" align="center">
          No products yet...
        </Typography>
      )}
    </>
  );
}
