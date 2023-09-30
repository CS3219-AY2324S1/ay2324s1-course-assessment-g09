/*
  Warnings:

  - You are about to drop the `MyUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MyUser";

-- CreateTable
CREATE TABLE "myuser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "myuser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "myuser_email_key" ON "myuser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "myuser_username_key" ON "myuser"("username");
