import JobCard from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "../../db/db";
import { filterJobs } from "./actions";

export default async function Home() {
  const jobPromise = prisma?.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const locationPromise = prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
    distinct: ["location"],
  });

  const [jobs, location] = await Promise.all([jobPromise, locationPromise]);

  console.log("location", location);

  return (
    <main className=" m-auto my-10 max-w-5xl space-y-10 px-3">
      <Button>HOME</Button>

      <section className="block justify-between gap-x-10 space-y-10 md:flex md:space-y-0">
        <div className="max-w-full md:max-w-[260px]">
          <form action={filterJobs}>
            <Label htmlFor="q" className="text-black">
              Sidebar
            </Label>
            <Input name="q" />
            <button type="submit">Submit</button>
          </form>
          {/* <JobFilterSidebar /> */}
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
