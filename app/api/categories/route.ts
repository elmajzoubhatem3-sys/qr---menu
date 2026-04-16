export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// GET
export async function GET() {
  try {
    const categories = await sql`
      SELECT id, name
      FROM categories
      ORDER BY id ASC
    `;

    return NextResponse.json(categories);
  } catch (err) {
    console.error("CATEGORIES GET ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: Request) {
  try {
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
  } catch (err) {
    console.error("CATEGORIES POST ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create category" },
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
      DELETE FROM categories
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CATEGORIES DELETE ERROR:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete category" },
      { status: 500 }
    );
  }
}