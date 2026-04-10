import { NextResponse } from "next/server";

let products = [
  {
    id: 1,
    category_id: 1,
    name: "Burger",
    description: "",
    price: 8,
    image_url: "",
    sort_order: 0,
    is_best_seller: false,
    is_spicy: false,
  },
];

// GET
export async function GET() {
  return NextResponse.json(products);
}

// POST (ADD)
export async function POST(req: Request) {
  const body = await req.json();

  const newProduct = {
    id: Date.now(),
    ...body,
  };

  products.push(newProduct);

  return NextResponse.json(newProduct);
}

// PUT (EDIT)
export async function PUT(req: Request) {
  const body = await req.json();

  products = products.map((p) =>
    p.id === body.id ? { ...p, ...body } : p
  );

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  products = products.filter((p) => p.id !== id);

  return NextResponse.json({ success: true });
}