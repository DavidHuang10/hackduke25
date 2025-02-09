-- CreateEnum
CREATE TYPE "Act" AS ENUM ('ACTIVATE', 'DEACTIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "act" "Act" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Limits" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "specificDomains" TEXT NOT NULL,

    CONSTRAINT "Limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainGroup" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "domains" TEXT NOT NULL,
    "limitsId" INTEGER,

    CONSTRAINT "DomainGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Limits" ADD CONSTRAINT "Limits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainGroup" ADD CONSTRAINT "DomainGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainGroup" ADD CONSTRAINT "DomainGroup_limitsId_fkey" FOREIGN KEY ("limitsId") REFERENCES "Limits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
