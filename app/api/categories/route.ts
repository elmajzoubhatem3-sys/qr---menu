import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET
export async function GET() {
  const categories = await sql`
    SELECT id, name, sort_order
    FROM categories
    ORDER BY sort_order ASC, id ASC
  `;

  return NextResponse.json(categories);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const name = String(body.name || "").trim();
  const sortOrder = Number(body.sort_order || 0);

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const result = await sql`
    INSERT INTO categories (name, sort_order)
    VALUES (${name}, ${sortOrder})
    RETURNING id, name, sort_order
  `;

  return NextResponse.json(result[0]);
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
    DELETE FROM categories
    WHERE id = ${id}
  `;

  return NextResponse.json({ success: true });
}