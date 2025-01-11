-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
