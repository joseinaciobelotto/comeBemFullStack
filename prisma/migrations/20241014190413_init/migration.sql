/*
  Warnings:

  - You are about to drop the column `email` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `correio` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `email`,
    ADD COLUMN `correio` VARCHAR(45) NOT NULL;
