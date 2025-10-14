import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db as prisma } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    const uploadedFiles = [];

    for (const file of files) {
      if (file.size === 0) continue;

      // Generate unique filename
      const fileExtension = file.name.split('.').pop() || '';
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const filePath = join(uploadDir, uniqueFilename);
      
      // Convert file to buffer and save
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      // Determine file type
      let type: "IMAGE" | "VIDEO" | "DOCUMENT" = "DOCUMENT";
      if (file.type.startsWith("image/")) {
        type = "IMAGE";
      } else if (file.type.startsWith("video/")) {
        type = "VIDEO";
      }

      // Save to database
      const media = await prisma.media.create({
        data: {
          filename: uniqueFilename,
          originalName: file.name,
          url: `/uploads/${uniqueFilename}`,
          type,
          size: file.size,
          mimeType: file.type,
          uploaderId: session.user.id,
        },
      });

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: "CREATE",
          entity: "MEDIA",
          entityId: media.id,
          userId: session.user.id,
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      });

      uploadedFiles.push({
        id: media.id,
        filename: media.filename,
        originalName: media.originalName,
        url: media.url,
        type: media.type,
        size: media.size,
        mimeType: media.mimeType,
      });
    }

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}