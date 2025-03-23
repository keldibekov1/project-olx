/*
  Warnings:

  - The primary key for the `Region` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_regionId_fkey";

-- AlterTable
ALTER TABLE "Region" DROP CONSTRAINT "Region_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Region_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "regionId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
