import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: new URLSearchParams({
        file: `data:${file.type};base64,${buffer.toString("base64")}`,
        upload_preset: "unsigned_upload",
      }),
    }
  );

  const data = await uploadRes.json();

  return NextResponse.json({
    url: data.secure_url,
  });
}