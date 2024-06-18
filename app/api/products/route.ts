import { products } from "@/mockdata";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(decodeURI(req.url)).searchParams;

  const skipParam = Number(searchParams.get("skip"));
  const skip = !isNaN(skipParam) ? skipParam : 0;
  const takeParam = searchParams.get("take");
  const take =
    takeParam !== null && !isNaN(Number(takeParam))
      ? Number(takeParam)
      : undefined;

  return NextResponse.json({
    products: products.slice(skip, take ? skip + take : undefined),
    count: products.length,
  });
}
