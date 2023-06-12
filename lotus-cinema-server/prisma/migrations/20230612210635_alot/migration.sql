/*
  Warnings:

  - Added the required column `image_url` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pg` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Made the column `genre` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `synopsis` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year_of_release` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "pg" TEXT NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "synopsis" SET NOT NULL,
ALTER COLUMN "year_of_release" SET NOT NULL;
