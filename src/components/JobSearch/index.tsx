import Link from "next/link";

import { IHomePage } from "@/app/page";
import JobCard from "@/components/Card";
import prisma from "../../../db/db";

const JobSearch = async ({
  filters,
  page,
}: {
  filters: Pick<IHomePage, "searchParams">["searchParams"];
  page?: number;
}) => {
  const jobsPerPage = 6;
  const skip = (Number(page) - 1) * jobsPerPage;

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
  console.log(count);
  return (
    <div>
      {jobs.length ? (
        jobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.slug}`}>
            <JobCard job={job} />
          </Link>
        ))
      ) : (
        <p>No Jobs Found</p>
      )}
    </div>
  );
};

export default JobSearch;
