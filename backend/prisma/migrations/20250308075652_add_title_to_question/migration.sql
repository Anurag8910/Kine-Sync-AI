/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LeaderBoard_email_key";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "title" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");
