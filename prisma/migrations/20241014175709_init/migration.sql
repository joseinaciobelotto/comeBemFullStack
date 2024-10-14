/*
  Warnings:

  - You are about to drop the column `ocupada` on the `mesas` table. All the data in the column will be lost.
  - Added the required column `email` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `email` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `mesas` DROP COLUMN `ocupada`,
    ADD COLUMN `ocupada` INTEGER NULL;
