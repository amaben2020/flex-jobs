import JobCard from "@/components/Card";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import Link from "next/link";
import prisma from "../../db/db";
import { filterJobs } from "./actions";

export interface IHomePage {
  searchParams: {
    q: string;
    type: string;
    location: string;
    remote: string;
  };
}
export default async function Home({ searchParams }: Readonly<IHomePage>) {
  console.log(searchParams);
  const jobs = await prisma?.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <section className="mx-auto space-y-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800">All developer jobs</h1>

        <h2 className="text-xl text-gray-600">Find your dream job.</h2>
      </section>
      <section className="block justify-between gap-x-10 space-y-10 md:flex md:space-y-0">
        <div className="max-w-full md:max-w-[260px]">
          <JobFilterSidebar action={filterJobs} filterValues={searchParams} />
        </div>
        <div className="flex-grow">
          {jobs.length ? (
            jobs.map((job) => (
              <Link key={job.id} href={`/${job.slug}`}>
                <JobCard job={job} />
              </Link>
            ))
          ) : (
            <p>No Jobs Found</p>
          )}
        </div>
      </section>
    </main>
  );
}
