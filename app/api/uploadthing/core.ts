import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { db as prisma } from "@/lib/db";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Main media uploader that handles images, videos, and documents
  mediaUploader: f({ 
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "128MB", maxFileCount: 5 },
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    "application/msword": { maxFileSize: "16MB", maxFileCount: 10 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { maxFileSize: "16MB", maxFileCount: 10 }
  })
    .middleware(async ({ req }) => {
      // Get user session
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Unauthorized");

      // Return metadata accessible in onUploadComplete
      return { 
        userId: session.user.id,
        userRole: session.user.role 
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File info:", { name: file.name, size: file.size, url: file.url, type: file.type });
      
      try {
        // Determine file type based on MIME type
        let type: "IMAGE" | "VIDEO" | "DOCUMENT" = "DOCUMENT";
        if (file.type.startsWith("image/")) {
          type = "IMAGE";
        } else if (file.type.startsWith("video/")) {
          type = "VIDEO";
        }

        // Save to database
        const media = await prisma.media.create({
          data: {
            filename: file.name,
            originalName: file.name,
            url: file.url,
            type,
            size: file.size,
            mimeType: file.type,
            uploaderId: metadata.userId,
          },
        });

        // Create audit log
        await prisma.auditLog.create({
          data: {
            action: "CREATE",
            entity: "MEDIA",
            entityId: media.id,
            userId: metadata.userId,
            ipAddress: "uploadthing",
            userAgent: "uploadthing-upload",
          },
        });

        console.log("Media saved to database:", media.id);
        
        // Return data to client
        return { 
          uploadedBy: metadata.userId, 
          url: file.url,
          mediaId: media.id,
          type,
          name: file.name,
          size: file.size
        };
      } catch (error) {
        console.error("Error saving media to database:", error);
        // Don't throw error to avoid breaking the upload, just log it
        return { 
          uploadedBy: metadata.userId, 
          url: file.url,
          error: "Failed to save to database"
        };
      }
    }),

  // Legacy image uploader for backward compatibility
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session?.user) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete for userId:", metadata.userId);
      return { uploadedBy: metadata.userId, url: file.url, name: file.name, size: file.size };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;