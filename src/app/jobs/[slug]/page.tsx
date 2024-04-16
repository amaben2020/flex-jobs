import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@db/db";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
interface IJob {
  params: {
    slug: string;
  };
}
// caching the result
const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });

  if (!job) {
    notFound();
  }

  return job;
});

// seo optimization
export async function generateMetadata({
  params: { slug },
}: IJob): Promise<Metadata & { openGraph: { images: string } }> {
  const job = await getJob(slug);

  return {
    title: job.title,
    openGraph: {
      images: job?.companyLogo!!,
    },
  };
}

const JobPage = async ({ params: { slug } }: IJob) => {
  const job = await getJob(slug);
  const applicationLink = job.applicationEmail
    ? `mailto:${job.applicationEmail}`
    : job.applicationUrl;
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:items-start">
      <section className="flex w-full grow justify-between space-y-5">
        <div className="  flex-grow  items-center gap-3 space-y-4">
          {job.companyLogo && (
            <Image
              src={job.companyLogo}
              alt="Company logo"
              width={100}
              height={100}
              className=" rounded-xl"
            />
          )}

          <h3>Company {job.companyName}</h3>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Responsibilities & Duties: {job.description}</p>
          <p>
            {job.approved && <Badge className="bg-green-600">Approved </Badge>}
          </p>
        </div>

        <aside>
          <Button asChild>
            <a
              href={applicationLink!!}
              target="_blank"
              className="w-40 md:w-fit"
            >
              Apply Now
            </a>
          </Button>
        </aside>
      </section>
    </main>
  );
};

export default JobPage;
