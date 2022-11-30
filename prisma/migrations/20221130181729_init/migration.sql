-- CreateTable
CREATE TABLE "BlockchainEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nftContractAddress" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "priceEth" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL
);
