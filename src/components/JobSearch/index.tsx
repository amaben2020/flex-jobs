import Link from "next/link";

import { IHomePage } from "@/app/page";
import JobCard from "@/components/Card";
import { cn } from "@/lib/utils";
import prisma from "@db/db";
import { ArrowLeft, ArrowRight } from "lucide-react";

const JobSearch = async ({
  filters,
  page = 0,
}: {
  filters: Pick<IHomePage, "searchParams">["searchParams"];
  page?: number;
}) => {
  const jobsPerPage = 6;

  const skip = Number(page) * jobsPerPage;

  const searchTerm = filters?.q?.length
    ? filters?.q.split(" ").join(" & ")
    : "";

  const search = {
    title: {
      search: searchTerm,
    },
    companyName: {
      search: searchTerm,
    },
    location: { search: searchTerm },
  };

  const queries = {
    ...(filters?.type ? { type: filters?.type } : null),
    ...(filters?.location?.length ? { location: filters?.location } : null),
    ...(filters?.remote === "true"
      ? { locationType: "Remote" }
      : filters?.remote?.length
        ? { locationType: filters?.remote }
        : null),
  };

  const buildQuery = {
    ...(searchTerm.length && {
      ...search,
    }),
  };

  const jobsPromise = prisma?.job.findMany({
    where: {
      ...(searchTerm.length ? { OR: [{ ...buildQuery }] } : {}),
      ...(filters?.type || filters.location || filters.remote === "true"
        ? { AND: [{ ...queries }] }
        : {}),
      approved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count();

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div>
      {jobs?.length ? (
        jobs?.map((job) => (
          <Link key={job.id} href={`/jobs/${job.slug}`}>
            <JobCard job={job} />
          </Link>
        ))
      ) : (
        <p>No Jobs Found</p>
      )}

      {jobs?.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(count / jobsPerPage)}
          filterValues={filters}
        />
      )}
    </div>
  );
};

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, remote, type, location },
}: any) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: true }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between ">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          currentPage <= 0 && "invisible",
          "flex items-center gap-2 font-semibold",
        )}
      >
        <ArrowLeft size={16} />
        Prev
      </Link>

      <span>
        {" "}
        Page{currentPage + 1} of {totalPages}
      </span>

      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          currentPage + 1 >= totalPages && "invisible",
          "flex items-center gap-2 font-semibold",
        )}
      >
        <ArrowRight size={16} />
        Next
      </Link>
    </div>
  );
}

export default JobSearch;
