import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db as prisma } from "@/lib/db";
import { z } from "zod";

const settingSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has settings access
    if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can access settings" },
        { status: 403 }
      );
    }

    const settings = await prisma.settings.findMany({
      orderBy: { key: 'asc' }
    });

    // Convert to key-value object for easier frontend handling
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = {
        value: setting.value
      };
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has settings access
    if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only admins can modify settings" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Handle bulk update
    if (Array.isArray(body)) {
      const validatedSettings = body.map(setting => settingSchema.parse(setting));
      
      // Update settings in database
      const results = [];
      for (const setting of validatedSettings) {
        const result = await prisma.settings.upsert({
          where: { key: setting.key },
          update: { 
            value: setting.value
          },
          create: setting,
        });
        results.push(result);
      }

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: "UPDATE",
          entity: "SETTINGS",
          entityId: "bulk",
          userId: session.user.id,
          data: { settings: validatedSettings },
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
          userAgent: request.headers.get("user-agent") || "unknown",
        },
      });

      return NextResponse.json(results);
    }

    // Handle single setting update
    const validatedData = settingSchema.parse(body);

    const setting = await prisma.settings.upsert({
      where: { key: validatedData.key },
      update: { 
        value: validatedData.value
      },
      create: validatedData,
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "SETTINGS",
        entityId: setting.key,
        userId: session.user.id,
        data: validatedData,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
        userAgent: request.headers.get("user-agent") || "unknown",
      },
    });

    return NextResponse.json(setting, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}