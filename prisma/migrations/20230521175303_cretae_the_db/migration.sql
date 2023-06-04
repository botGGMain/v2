-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "info" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_number_key" ON "user"("number");

-- CreateIndex
CREATE UNIQUE INDEX "cards_id_key" ON "cards"("id");
