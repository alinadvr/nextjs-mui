import { NextResponse } from "next/server";

import { products } from "@/mockdata";

export async function GET(req: Request) {
  const pathname = new URL(decodeURI(req.url)).pathname;
  const link = pathname.split("/").pop();

  const product = products.find((product) => product.link === link);

  if (!product)
    return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}
