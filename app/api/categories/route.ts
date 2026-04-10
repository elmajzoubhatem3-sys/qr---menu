import { NextResponse } from "next/server";

let categories = [
  { id: 1, name: "Burgers", sort_order: 0 },
  { id: 2, name: "Pizza", sort_order: 0 },
];

// GET
export async function GET() {
  return NextResponse.json(categories);
}

// POST (ADD)
export async function POST(req: Request) {
  const body = await req.json();

  const newCat = {
    id: Date.now(),
    name: body.name,
    sort_order: body.sort_order || 0,
  };

  categories.push(newCat);

  return NextResponse.json(newCat);
}

// DELETE
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  categories = categories.filter((c) => c.id !== id);

  return NextResponse.json({ success: true });
}