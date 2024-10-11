/*
  Warnings:

  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReservaMesas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `ReservaMesas` DROP FOREIGN KEY `ReservaMesas_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `ReservaMesas` DROP FOREIGN KEY `ReservaMesas_mesaId_fkey`;

-- DropTable
DROP TABLE `Cliente`;

-- DropTable
DROP TABLE `Feedback`;

-- DropTable
DROP TABLE `Mesa`;

-- DropTable
DROP TABLE `ReservaMesas`;

-- CreateTable
CREATE TABLE `clientes` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `cargo` ENUM('Cliente', 'Garcom', 'Gerente') NOT NULL,

    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesas` (
    `id_mesas` INTEGER NOT NULL AUTO_INCREMENT,
    `ocuapada` INTEGER NULL,

    PRIMARY KEY (`id_mesas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservas_mesas` (
    `id_reservas_mesas` INTEGER NOT NULL AUTO_INCREMENT,
    `clientes_id_cliente` INTEGER NOT NULL,
    `mesas_id_mesas` INTEGER NOT NULL,

    UNIQUE INDEX `reservas_mesas_clientes_id_cliente_mesas_id_mesas_key`(`clientes_id_cliente`, `mesas_id_mesas`),
    PRIMARY KEY (`id_reservas_mesas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedbacks` (
    `clientes_id_cliente` INTEGER NOT NULL,
    `menssagem` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`clientes_id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas_mesas` ADD CONSTRAINT `reservas_mesas_clientes_id_cliente_fkey` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas_mesas` ADD CONSTRAINT `reservas_mesas_mesas_id_mesas_fkey` FOREIGN KEY (`mesas_id_mesas`) REFERENCES `mesas`(`id_mesas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_clientes_id_cliente_fkey` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
