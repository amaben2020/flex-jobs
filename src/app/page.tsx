import JobCard from "@/components/Card";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import { Button } from "@/components/ui/button";
import prisma from "../../db/db";

export default async function Home() {
  const filterJobs = (formData: FormData) => {};
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const location = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
    distinct: ["location"],
  });

  console.log("location", location);

  return (
    <main className=" m-auto my-10 max-w-5xl space-y-10 px-3">
      <Button>HOME</Button>

      <section className="block justify-between gap-x-10 space-y-10 md:flex md:space-y-0">
        <div className="max-w-full md:max-w-[260px]">
          <JobFilterSidebar />
        </div>
        <div className="flex-grow space-y-10">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}
