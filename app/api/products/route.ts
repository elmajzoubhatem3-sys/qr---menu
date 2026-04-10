export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET
export async function GET() {
  const products = await sql`
    SELECT
      id,
      category_id,
      name,
      description,
      price,
      image_url,
      sort_order,
      is_best_seller,
      is_spicy
    FROM products
    ORDER BY sort_order ASC, id ASC
  `;

  return NextResponse.json(products);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const categoryId = Number(body.category_id);
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const price = Number(body.price || 0);
  const imageUrl = String(body.image_url || "").trim();
  const sortOrder = Number(body.sort_order || 0);
  const isBestSeller = Boolean(body.is_best_seller);
  const isSpicy = Boolean(body.is_spicy);

  if (!categoryId || !name) {
    return NextResponse.json(
      { error: "category_id and name are required" },
      { status: 400 }
    );
  }

  const result = await sql`
    INSERT INTO products (
      category_id,
      name,
      description,
      price,
      image_url,
      sort_order,
      is_best_seller,
      is_spicy
    )
    VALUES (
      ${categoryId},
      ${name},
      ${description},
      ${price},
      ${imageUrl},
      ${sortOrder},
      ${isBestSeller},
      ${isSpicy}
    )
    RETURNING
      id,
      category_id,
      name,
      description,
      price,
      image_url,
      sort_order,
      is_best_seller,
      is_spicy
  `;

  return NextResponse.json(result[0]);
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();

  const id = Number(body.id);
  const categoryId = Number(body.category_id);
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const price = Number(body.price || 0);
  const imageUrl = String(body.image_url || "").trim();
  const sortOrder = Number(body.sort_order || 0);
  const isBestSeller = Boolean(body.is_best_seller);
  const isSpicy = Boolean(body.is_spicy);

  if (!id || !categoryId || !name) {
    return NextResponse.json(
      { error: "id, category_id and name are required" },
      { status: 400 }
    );
  }

  await sql`
    UPDATE products
    SET
      category_id = ${categoryId},
      name = ${name},
      description = ${description},
      price = ${price},
      image_url = ${imageUrl},
      sort_order = ${sortOrder},
      is_best_seller = ${isBestSeller},
      is_spicy = ${isSpicy}
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: Request) {
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
}