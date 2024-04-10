const { placeholderJobs } = require("./placeholder-data");
const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all(
      placeholderJobs.map(async (job) => {
        await prisma.job.upsert({
          where: {
            slug: job.slug,
          },
          update: job,
          create: job,
        });
      }),
    );
    console.log("Seed successful");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Error", error);
      console.log("Something went wrong!");
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
