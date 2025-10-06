import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const pageSchema = z.object({
    title: z.object({
        fr: z.string().min(1, "Le titre français est requis"),
        en: z.string().min(1, "The English title is required"),
    }),
    slug: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-\/]+$/, "Slug must be lowercase with hyphens and slashes only"),
    content: z.object({
        fr: z.string(),
        en: z.string(),
    }),
    status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]).optional(),
    template: z.string().optional(),
    metaTitle: z
        .object({
            fr: z.string().optional(),
            en: z.string().optional(),
        })
        .optional()
        .nullable(),
    metaDescription: z
        .object({
            fr: z.string().optional(),
            en: z.string().optional(),
        })
        .optional()
        .nullable(),
    order: z.number().optional(),
    parentId: z.string().optional().nullable(),
    serviceType: z.string().optional().nullable(),
    requiredDocs: z
        .object({
            fr: z.array(z.string()).optional(),
            en: z.array(z.string()).optional(),
        })
        .optional()
        .nullable(),
    fees: z.record(z.number()).optional().nullable(),
    processingTime: z
        .object({
            fr: z.string().optional(),
            en: z.string().optional(),
        })
        .optional()
        .nullable(),
    paymentLink: z.string().url().optional().nullable(),
    formLink: z.string().url().optional().nullable(),
});

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (
            !session?.user ||
            !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.user.role)
        ) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const serviceType = searchParams.get("serviceType");
        const status = searchParams.get("status");
        const parentId = searchParams.get("parentId");

        const pages = await prisma.page.findMany({
            where: {
                ...(serviceType && { serviceType }),
                ...(status && { status: status as any }),
                ...(parentId !== null && { parentId }),
            },
            include: {
                parent: true,
                children: true,
            },
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });

        return NextResponse.json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        return NextResponse.json(
            { error: "Failed to fetch pages" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (
            !session?.user ||
            !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)
        ) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const validatedData = pageSchema.parse(body);

        // Check if slug already exists
        const existingPage = await prisma.page.findUnique({
            where: { slug: validatedData.slug },
        });

        if (existingPage) {
            return NextResponse.json(
                { error: "A page with this slug already exists" },
                { status: 400 }
            );
        }

        const createData: any = {
            ...validatedData,
            publishedAt:
                validatedData.status === "PUBLISHED" ? new Date() : null,
        };

        // Handle null parentId properly
        if (validatedData.parentId === null) {
            createData.parentId = null;
        } else if (validatedData.parentId) {
            createData.parentId = validatedData.parentId;
        }

        const page = await prisma.page.create({
            data: createData,
            include: {
                parent: true,
                children: true,
            },
        });

        // Log the action
        await prisma.auditLog.create({
            data: {
                action: "CREATE",
                entity: "Page",
                entityId: page.id,
                userId: session.user.id,
                data: { page },
            },
        });

        return NextResponse.json(page, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation error", details: error.message },
                { status: 400 }
            );
        }

        console.error("Error creating page:", error);
        return NextResponse.json(
            { error: "Failed to create page" },
            { status: 500 }
        );
    }
}
