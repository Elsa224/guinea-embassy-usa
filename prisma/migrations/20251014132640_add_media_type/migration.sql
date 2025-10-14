-- CreateEnum
CREATE TYPE "public"."MediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- AlterTable
ALTER TABLE "public"."media" ADD COLUMN     "type" "public"."MediaType" NOT NULL DEFAULT 'DOCUMENT';

-- CreateIndex
CREATE INDEX "media_type_idx" ON "public"."media"("type");
