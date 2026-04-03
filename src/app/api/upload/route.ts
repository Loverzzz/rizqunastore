import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error:
            "Cloudinary belum dikonfigurasi. Tambahkan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di environment variables.",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.",
        },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB." },
        { status: 400 },
      );
    }

    // Upload to Cloudinary
    const timestamp = Math.round(Date.now() / 1000);

    // Generate signature
    const crypto = await import("crypto");
    const signatureString = `folder=rizquna&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", timestamp.toString());
    uploadData.append("signature", signature);
    uploadData.append("folder", "rizquna");

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: uploadData },
    );

    if (!cloudinaryRes.ok) {
      const err = await cloudinaryRes.json();
      console.error("Cloudinary error:", err);
      return NextResponse.json(
        { error: "Gagal mengunggah gambar." },
        { status: 500 },
      );
    }

    const result = await cloudinaryRes.json();

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
