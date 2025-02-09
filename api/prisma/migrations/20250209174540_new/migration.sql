/*
  Warnings:

  - You are about to drop the column `limitsId` on the `DomainGroup` table. All the data in the column will be lost.
  - The `domains` column on the `DomainGroup` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `specificDomains` column on the `Limits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `allowedDistractionTime` to the `Limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Limits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Limits` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- DropForeignKey
ALTER TABLE "DomainGroup" DROP CONSTRAINT "DomainGroup_limitsId_fkey";

-- AlterTable
ALTER TABLE "DomainGroup" DROP COLUMN "limitsId",
DROP COLUMN "domains",
ADD COLUMN     "domains" TEXT[];

-- AlterTable
ALTER TABLE "Limits" ADD COLUMN     "allowedDistractionTime" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "recurringDays" "Days"[],
ADD COLUMN     "startTime" TEXT NOT NULL,
DROP COLUMN "specificDomains",
ADD COLUMN     "specificDomains" TEXT[];

-- CreateTable
CREATE TABLE "_DomainGroupToLimits" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DomainGroupToLimits_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DomainGroupToLimits_B_index" ON "_DomainGroupToLimits"("B");

-- AddForeignKey
ALTER TABLE "_DomainGroupToLimits" ADD CONSTRAINT "_DomainGroupToLimits_A_fkey" FOREIGN KEY ("A") REFERENCES "DomainGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DomainGroupToLimits" ADD CONSTRAINT "_DomainGroupToLimits_B_fkey" FOREIGN KEY ("B") REFERENCES "Limits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
