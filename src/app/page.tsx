import JobFilterSidebar from "@/components/JobFilterSidebar";

import InfoTitle from "@/components/InfoTitle";
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
      <InfoTitle searchParams={searchParams} subText="Find your dream job." />
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
