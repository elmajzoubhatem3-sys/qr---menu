import { NextResponse } from "next/server";

let categories = [
  { id: 1, name: "Burgers" },
  { id: 2, name: "Pizza" },
];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newCat = {
    id: Date.now(),
    name: body.name,
  };

  categories.push(newCat);

  return NextResponse.json(newCat);
}