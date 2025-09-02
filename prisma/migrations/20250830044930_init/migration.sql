-- CreateTable
CREATE TABLE "activities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label_code" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mylabels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logo" TEXT NOT NULL,
    "item_code" TEXT NOT NULL,
    "lot_number" TEXT,
    "label_temp" TEXT NOT NULL,
    "product_name_en" TEXT NOT NULL,
    "product_name_zh" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "case_quantity" INTEGER NOT NULL,
    "case_unit" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "shelf_life" TEXT,
    "case_gtin" TEXT,
    "ingredient" TEXT NOT NULL,
    "allergen" TEXT NOT NULL,
    "manufactured" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "customer_item_code" TEXT
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "labelstyle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "item_code" JSONB NOT NULL,
    "lot_number" JSONB NOT NULL,
    "product_name_en" JSONB NOT NULL,
    "product_name_zh" JSONB NOT NULL,
    "weight" JSONB NOT NULL,
    "case_quantity" JSONB NOT NULL,
    "case_unit" JSONB NOT NULL,
    "storage" JSONB NOT NULL,
    "best_before" JSONB NOT NULL,
    "ingredient" JSONB NOT NULL,
    "allergen" JSONB NOT NULL,
    "manufactured" JSONB NOT NULL,
    "shelf_life" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "activities_id_key" ON "activities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mylabels_id_key" ON "mylabels"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "labelstyle_id_key" ON "labelstyle"("id");
