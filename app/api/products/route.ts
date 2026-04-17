export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET
export async function GET() {
  try {
    const products = await sql`
      SELECT id, name, price, image_url, category_id
      FROM products
      ORDER BY id DESC
    `;

    return NextResponse.json(products);
  } catch (err) {
    console.error("PRODUCTS GET ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const price = Number(body.price || 0);
    const imageUrl = String(body.image_url || "");
    const categoryId = Number(body.category_id || 0);

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO products (name, price, image_url, category_id)
      VALUES (${name}, ${price}, ${imageUrl}, ${categoryId})
      RETURNING id, name, price, image_url, category_id
    `;

    return NextResponse.json(result[0]);
  } catch (err) {
    console.error("PRODUCTS POST ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create product" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Invalid id" },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM products
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PRODUCTS DELETE ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete product" },
      { status: 500 }
    );
  }
}