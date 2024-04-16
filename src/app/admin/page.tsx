import JobCard from "@/components/Card";
import prisma from "@db/db";
import Link from "next/link";

const AdminPage = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: {
      approved: false,
    },
  });
  return (
    <main className="flex flex-col gap-3 ">
      <h2>Unapproved Jobs</h2>

      {unapprovedJobs?.map((job) => (
        <Link href={`/admin/jobs/${job.slug}`} key={job.id}>
          <JobCard job={job} />
        </Link>
      ))}

      {unapprovedJobs.length === 0 && <div>Unapproved Jobs not found</div>}
    </main>
  );
};

export default AdminPage;
