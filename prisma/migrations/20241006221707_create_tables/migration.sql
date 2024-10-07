-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `cargo` ENUM('Cliente', 'Garcom', 'Gerente') NOT NULL,

    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesa` (
    `id_mesas` INTEGER NOT NULL AUTO_INCREMENT,
    `ocupada` INTEGER NULL,

    PRIMARY KEY (`id_mesas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservaMesas` (
    `id_reservas_mesas` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `mesaId` INTEGER NOT NULL,

    UNIQUE INDEX `ReservaMesas_clienteId_mesaId_key`(`clienteId`, `mesaId`),
    PRIMARY KEY (`id_reservas_mesas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feedback` (
    `id_feedback` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `mensagem` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id_feedback`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservaMesas` ADD CONSTRAINT `ReservaMesas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservaMesas` ADD CONSTRAINT `ReservaMesas_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesa`(`id_mesas`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
