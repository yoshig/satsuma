-- CreateTable
CREATE TABLE "NFT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "priceEth" INTEGER NOT NULL,
    "owner" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NFT_address_key" ON "NFT"("address");
