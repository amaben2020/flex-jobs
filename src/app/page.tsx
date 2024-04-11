import JobCard from "@/components/Card";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import Link from "next/link";
import prisma from "../../db/db";
import { filterJobs } from "./actions";

interface IHomePage {
  searchParams: {
    q: string;
    type: string;
    jobType: string;
    location: string;
  };
}
export default async function Home({ searchParams }: Readonly<IHomePage>) {
  console.log(searchParams);
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
  // console.log(location);
  return (
    <main className=" m-auto my-10 max-w-5xl space-y-10 px-3">
      <section className="block justify-between gap-x-10 space-y-10 md:flex md:space-y-0">
        <div className="max-w-full md:max-w-[260px]">
          <JobFilterSidebar action={filterJobs} />
        </div>
        <div className="flex-grow">
          {jobs.map((job) => (
            <Link key={job.id} href={`/${job.slug}`}>
              <JobCard job={job} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
