export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET
export async function GET() {
  const categories = await sql`
    SELECT id, name
    FROM categories
    ORDER BY id ASC
  `;

  return NextResponse.json(categories);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const name = String(body.name || "").trim();

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400 }
    );
  }

  const result = await sql`
    INSERT INTO categories (name)
    VALUES (${name})
    RETURNING id, name
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