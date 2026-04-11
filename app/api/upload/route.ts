import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const blob = await put(
      `products/${Date.now()}-${file.name}`,
      file,
      {
        access: "public", // لأنو هلق store صار public
      }
    );

    return NextResponse.json({ url: blob.url });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}