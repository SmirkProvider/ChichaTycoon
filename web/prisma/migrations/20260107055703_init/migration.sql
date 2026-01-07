-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "balance" REAL NOT NULL DEFAULT 0,
    "gems" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "shishasServed" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Lounge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'My Shisha Lounge',
    "reputation" REAL NOT NULL DEFAULT 0,
    "hookahCount" INTEGER NOT NULL DEFAULT 1,
    "flavorLevel" INTEGER NOT NULL DEFAULT 1,
    "decorLevel" INTEGER NOT NULL DEFAULT 1,
    "seats" INTEGER NOT NULL DEFAULT 5,
    "lastCollection" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lounge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loungeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "speed" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Employee_loungeId_fkey" FOREIGN KEY ("loungeId") REFERENCES "Lounge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lounge_userId_key" ON "Lounge"("userId");
