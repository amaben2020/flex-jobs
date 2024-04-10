import JobCard from "@/components/Card";
import { Button } from "@/components/ui/button";
import prisma from "../../db/db";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-5">
      <Button>HOME</Button>
      {JSON.stringify(jobs)}
      <JobCard />
    </main>
  );
}
