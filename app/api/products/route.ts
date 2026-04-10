import { NextResponse } from "next/server";

let products = [
  {
    id: 1,
    categoryId: 1,
    name: "Burger",
    price: "$8",
  },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = {
    id: Date.now(),
    ...body,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct);
}