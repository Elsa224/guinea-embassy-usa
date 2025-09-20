# Guide d'Implémentation du Dashboard Administratif

## Système de Gestion de Contenu pour le Consulat Général de Côte d'Ivoire

### Vue d'Ensemble

Ce guide détaille l'implémentation d'un système de gestion de contenu (CMS) similaire à WordPress pour le site web du Consulat Général de Côte d'Ivoire. Le système permettra aux administrateurs de gérer facilement le contenu du site sans connaissances techniques.

---

## 1. Architecture Technique Recommandée

### Stack Technologique

- **Frontend**: Next.js 15 avec React 19
- **Backend**: Next.js API Routes + Prisma ORM
- **Base de données**: PostgreSQL (production) / SQLite (développement)
- **Authentification**: NextAuth.js
- **Upload de fichiers**: Uploadthing ou AWS S3
- **Styling**: Tailwind CSS
- **Editor de contenu**: TinyMCE ou Quill.js

### Structure des Dossiers

```
consulat-app/
├── app/
│   ├── admin/                    # Dashboard administratif
│   │   ├── dashboard/
│   │   ├── content/
│   │   ├── users/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── content/
│   │   ├── upload/
│   │   └── users/
│   └── (public)/                 # Pages publiques
├── components/
│   ├── admin/                    # Composants du dashboard
│   ├── ui/                       # Composants UI réutilisables
│   └── editor/                   # Éditeur de contenu
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── utils.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── public/
    └── uploads/
```

---

## 2. Modèle de Données

### Schéma Prisma Recommandé

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String
  role        Role     @default(EDITOR)
  password    String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  posts       Post[]
  media       Media[]

  @@map("users")
}

model Post {
  id          String      @id @default(cuid())
  title       String
  slug        String      @unique
  content     String      @db.Text
  excerpt     String?
  status      PostStatus  @default(DRAFT)
  type        PostType    @default(POST)
  featured    Boolean     @default(false)
  publishedAt DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  authorId    String
  author      User        @relation(fields: [authorId], references: [id])
  categoryId  String?
  category    Category?   @relation(fields: [categoryId], references: [id])

  tags        Tag[]       @relation("PostTags")
  media       Media[]     @relation("PostMedia")

  @@map("posts")
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  color       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  posts       Post[]

  @@map("categories")
}

model Tag {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())

  posts     Post[]   @relation("PostTags")

  @@map("tags")
}

model Media {
  id          String    @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int
  url         String
  alt         String?
  caption     String?
  createdAt   DateTime  @default(now())

  uploaderId  String
  uploader    User      @relation(fields: [uploaderId], references: [id])
  posts       Post[]    @relation("PostMedia")

  @@map("media")
}

model Page {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  content     String     @db.Text
  status      PostStatus @default(DRAFT)
  template    String?
  metaTitle   String?
  metaDescription String?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("pages")
}

model Settings {
  id    String @id @default(cuid())
  key   String @unique
  value String @db.Text
  type  String @default("text")

  @@map("settings")
}

enum Role {
  ADMIN
  EDITOR
  AUTHOR
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum PostType {
  POST
  NEWS
  EVENT
  SERVICE
  ANNOUNCEMENT
}
```

---

## 3. Fonctionnalités du Dashboard

### 3.1 Authentification et Autorisation

```typescript
// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.isActive) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.sub;
                session.user.role = token.role;
            }
            return session;
        },
    },
};
```

### 3.2 Interface du Dashboard

```tsx
// app/admin/layout.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (
        !session ||
        !["ADMIN", "EDITOR", "AUTHOR"].includes(session.user.role)
    ) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader session={session} />
            <div className="flex">
                <AdminSidebar userRole={session.user.role} />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
```

### 3.3 Gestion du Contenu

```tsx
// components/admin/ContentEditor.tsx
"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface ContentEditorProps {
    initialData?: any;
    onSave: (data: any) => Promise<void>;
    type: "post" | "page" | "news" | "event";
}

export function ContentEditor({
    initialData,
    onSave,
    type,
}: ContentEditorProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        content: initialData?.content || "",
        status: initialData?.status || "DRAFT",
        category: initialData?.categoryId || "",
        excerpt: initialData?.excerpt || "",
        featured: initialData?.featured || false,
        publishedAt: initialData?.publishedAt || null,
    });

    const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
        await onSave({
            ...formData,
            status,
            publishedAt: status === "PUBLISHED" ? new Date() : null,
        });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-lg bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-4 md:col-span-2">
                        <Input
                            placeholder="Titre du contenu"
                            value={formData.title}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="border-none p-0 text-2xl font-bold focus:ring-0"
                        />

                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={formData.content}
                            onEditorChange={content =>
                                setFormData({ ...formData, content })
                            }
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                language: "fr_FR",
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-3 font-semibold">Publication</h3>
                            <div className="space-y-3">
                                <Select
                                    value={formData.status}
                                    onValueChange={value =>
                                        setFormData({
                                            ...formData,
                                            status: value,
                                        })
                                    }
                                >
                                    <option value="DRAFT">Brouillon</option>
                                    <option value="PUBLISHED">Publié</option>
                                    <option value="ARCHIVED">Archivé</option>
                                </Select>

                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSave("DRAFT")}
                                    >
                                        Sauvegarder
                                    </Button>
                                    <Button
                                        onClick={() => handleSave("PUBLISHED")}
                                        className="bg-ci-orange hover:bg-orange-600"
                                    >
                                        Publier
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {type === "post" && (
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-3 font-semibold">
                                    Catégorie
                                </h3>
                                <Select
                                    value={formData.category}
                                    onValueChange={value =>
                                        setFormData({
                                            ...formData,
                                            category: value,
                                        })
                                    }
                                >
                                    <option value="">
                                        Sélectionner une catégorie
                                    </option>
                                    <option value="news">Actualités</option>
                                    <option value="services">Services</option>
                                    <option value="events">Événements</option>
                                </Select>
                            </div>
                        )}

                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-3 font-semibold">Extrait</h3>
                            <textarea
                                placeholder="Résumé du contenu..."
                                value={formData.excerpt}
                                onChange={e =>
                                    setFormData({
                                        ...formData,
                                        excerpt: e.target.value,
                                    })
                                }
                                className="w-full resize-none rounded border p-2"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```

---

## 4. API Routes

### 4.1 Gestion des Posts

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const posts = await prisma.post.findMany({
        where,
        include: {
            author: { select: { name: true, email: true } },
            category: { select: { name: true, slug: true } },
            _count: { select: { tags: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
    });

    const total = await prisma.post.count({ where });

    return NextResponse.json({
        posts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    });
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const post = await prisma.post.create({
        data: {
            ...data,
            authorId: session.user.id,
            slug: generateSlug(data.title),
        },
    });

    return NextResponse.json(post);
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[àáäâ]/g, "a")
        .replace(/[èéëê]/g, "e")
        .replace(/[ìíïî]/g, "i")
        .replace(/[òóöô]/g, "o")
        .replace(/[ùúüû]/g, "u")
        .replace(/[ç]/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}
```

### 4.2 Upload de Fichiers

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 }
        );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), "public/uploads", filename);

    await writeFile(path, buffer);

    const media = await prisma.media.create({
        data: {
            filename,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            url: `/uploads/${filename}`,
            uploaderId: session.user.id,
        },
    });

    return NextResponse.json(media);
}
```

---

## 5. Fonctionnalités Avancées

### 5.1 Gestion des Rôles et Permissions

```typescript
// lib/permissions.ts
export const PERMISSIONS = {
    ADMIN: [
        "create_posts",
        "edit_posts",
        "delete_posts",
        "publish_posts",
        "manage_users",
        "manage_settings",
        "manage_media",
        "create_pages",
        "edit_pages",
        "delete_pages",
    ],
    EDITOR: [
        "create_posts",
        "edit_posts",
        "delete_posts",
        "publish_posts",
        "manage_media",
        "create_pages",
        "edit_pages",
    ],
    AUTHOR: ["create_posts", "edit_own_posts", "manage_own_media"],
};

export function hasPermission(userRole: string, permission: string): boolean {
    return (
        PERMISSIONS[userRole as keyof typeof PERMISSIONS]?.includes(
            permission
        ) || false
    );
}
```

### 5.2 Multi-langue

```typescript
// lib/i18n.ts
export const LANGUAGES = {
  fr: 'Français',
  en: 'English'
}

export interface TranslatableContent {
  fr: string
  en: string
}

// Modifier le modèle Post pour supporter le multi-langue
model Post {
  // ... autres champs
  title_fr     String
  title_en     String?
  content_fr   String    @db.Text
  content_en   String?   @db.Text
  excerpt_fr   String?
  excerpt_en   String?
}
```

### 5.3 Cache et Performance

```typescript
// lib/cache.ts
import { unstable_cache } from "next/cache";

export const getCachedPosts = unstable_cache(
    async (params: { status?: string; type?: string; limit?: number }) => {
        return await prisma.post.findMany({
            where: {
                status: params.status || "PUBLISHED",
                type: params.type,
            },
            take: params.limit || 10,
            orderBy: { publishedAt: "desc" },
            include: {
                author: { select: { name: true } },
                category: { select: { name: true, slug: true } },
            },
        });
    },
    ["posts"],
    {
        revalidate: 300, // Cache pendant 5 minutes
        tags: ["posts"],
    }
);

// Invalider le cache lors des mises à jour
export function revalidatePostsCache() {
    revalidateTag("posts");
}
```

---

## 6. Déploiement et Configuration

### 6.1 Variables d'Environnement

```env
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/consulat_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_TINYMCE_API_KEY="your-tinymce-api-key"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

### 6.2 Scripts de Déploiement

```json
// package.json
{
    "scripts": {
        "build": "next build",
        "start": "next start",
        "deploy": "npm run build && pm2 restart consulat-app",
        "db:migrate": "prisma migrate deploy",
        "db:seed": "prisma db seed"
    }
}
```

### 6.3 Seed de Données Initiales

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Créer un administrateur par défaut
    const hashedPassword = await bcrypt.hash("admin123", 12);

    await prisma.user.upsert({
        where: { email: "admin@consulat-ci.org" },
        update: {},
        create: {
            email: "admin@consulat-ci.org",
            name: "Administrateur",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    // Créer des catégories par défaut
    await prisma.category.createMany({
        data: [
            { name: "Actualités", slug: "actualites", color: "#FF7F00" },
            { name: "Services", slug: "services", color: "#00AA4F" },
            { name: "Événements", slug: "evenements", color: "#003366" },
        ],
        skipDuplicates: true,
    });

    // Créer des paramètres par défaut
    await prisma.settings.createMany({
        data: [
            {
                key: "site_title",
                value: "Consulat Général de Côte d'Ivoire - New York",
            },
            {
                key: "site_description",
                value: "Site officiel du Consulat Général de Côte d'Ivoire à New York",
            },
            {
                key: "contact_email",
                value: "consulat.newyork@diplomatie.gouv.ci",
            },
            { key: "contact_phone", value: "+1 (212) 697-0900" },
            {
                key: "address",
                value: "801 Second Avenue, 5th Floor, New York, NY 10017",
            },
        ],
        skipDuplicates: true,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```

---

## 7. Sécurité et Bonnes Pratiques

### 7.1 Validation des Données

```typescript
// lib/validation.ts
import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(1, "Titre requis").max(200, "Titre trop long"),
    content: z.string().min(1, "Contenu requis"),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    type: z.enum(["POST", "NEWS", "EVENT", "SERVICE", "ANNOUNCEMENT"]),
    excerpt: z.string().max(500, "Extrait trop long").optional(),
    categoryId: z.string().optional(),
});

export const userSchema = z.object({
    name: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    role: z.enum(["ADMIN", "EDITOR", "AUTHOR"]),
    password: z.string().min(8, "Mot de passe trop court"),
});
```

### 7.2 Middleware de Sécurité

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        // Logique additionnelle si nécessaire
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Protéger les routes admin
                if (req.nextUrl.pathname.startsWith("/admin")) {
                    return (
                        !!token &&
                        ["ADMIN", "EDITOR", "AUTHOR"].includes(
                            token.role as string
                        )
                    );
                }
                return true;
            },
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
```

---

## 8. Maintenance et Monitoring

### 8.1 Logs et Monitoring

```typescript
// lib/logger.ts
import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}
```

### 8.2 Sauvegarde Automatique

```bash
#!/bin/bash
# scripts/backup.sh

# Sauvegarde de la base de données
pg_dump $DATABASE_URL > "backups/db_$(date +%Y%m%d_%H%M%S).sql"

# Sauvegarde des fichiers uploadés
tar -czf "backups/uploads_$(date +%Y%m%d_%H%M%S).tar.gz" public/uploads/

# Nettoyage des anciennes sauvegardes (garde 30 jours)
find backups/ -name "*.sql" -mtime +30 -delete
find backups/ -name "*.tar.gz" -mtime +30 -delete
```

---

## 9. Formation des Administrateurs

### 9.1 Manuel Utilisateur

1. **Connexion au Dashboard**
    - Accéder à `/admin`
    - Utiliser les identifiants fournis
    - Changer le mot de passe lors de la première connexion

2. **Gestion du Contenu**
    - Créer un nouvel article/page
    - Utiliser l'éditeur WYSIWYG
    - Gérer les médias et images
    - Programmer la publication

3. **Organisation du Contenu**
    - Utiliser les catégories et tags
    - Gérer les menus de navigation
    - Organiser la hiérarchie des pages

### 9.2 Processus de Validation

1. **Workflow de Publication**
    - Brouillon → Révision → Publication
    - Système d'approbation pour les contenus sensibles
    - Historique des modifications

2. **Gestion des Utilisateurs**
    - Création de comptes utilisateur
    - Attribution des rôles et permissions
    - Surveillance des activités

---

## 10. Coûts et Ressources

### 10.1 Estimation des Coûts de Développement

- **Phase 1 - Setup et authentification**: 40-60 heures
- **Phase 2 - Dashboard et éditeur**: 80-120 heures
- **Phase 3 - API et gestion contenu**: 60-80 heures
- **Phase 4 - Tests et déploiement**: 40-60 heures
- **Total estimé**: 220-320 heures

### 10.2 Coûts d'Hébergement Mensuel

- **VPS/Cloud Server**: $50-100/mois
- **Base de données**: $20-50/mois
- **CDN et stockage**: $10-30/mois
- **Services tiers** (TinyMCE, monitoring): $20-40/mois
- **Total mensuel**: $100-220/mois

### 10.3 Maintenance

- **Mises à jour sécurité**: 8-16 heures/mois
- **Support utilisateurs**: 4-8 heures/mois
- **Nouvelles fonctionnalités**: Sur demande

---

Ce guide fournit une base solide pour implémenter un système de gestion de contenu professionnel pour le Consulat Général de Côte d'Ivoire. L'architecture proposée est modulaire, sécurisée et évolutive, permettant une maintenance facile et des extensions futures.
