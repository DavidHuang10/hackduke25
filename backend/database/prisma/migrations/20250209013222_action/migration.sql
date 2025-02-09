-- CreateEnum
CREATE TYPE "Act" AS ENUM ('ACTIVATE', 'DEACTIVATE');

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "domain" TEXT NOT NULL,
    "act" "Act" NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
