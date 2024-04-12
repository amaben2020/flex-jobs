import JobFilterSidebar from "@/components/JobFilterSidebar";

import JobSearch from "@/components/JobSearch";
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
  return (
    <main>
      <section className="mx-auto space-y-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800">All developer jobs</h1>

        <h2 className="text-xl text-gray-600">Find your dream job.</h2>
      </section>
      <section className="block justify-between gap-x-10 space-y-10 md:flex md:space-y-0">
        <div className="max-w-full md:max-w-[260px]">
          <JobFilterSidebar action={filterJobs} filterValues={searchParams} />
        </div>
        <div className="flex-grow">
          <JobSearch filters={searchParams} />
        </div>
      </section>
    </main>
  );
}
