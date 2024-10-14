/*
  Warnings:

  - A unique constraint covering the columns `[correio]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `clientes_correio_key` ON `clientes`(`correio`);
