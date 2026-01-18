/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "graphs" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "graphs_pkey" PRIMARY KEY ("id")
);
