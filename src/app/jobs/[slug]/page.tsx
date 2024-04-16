import Markdown from "@/components/Markdown";
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

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

const JobPage = async ({ params: { slug } }: IJob) => {
  const job = await getJob(slug);
  const applicationLink = job.applicationEmail
    ? `mailto:${job.applicationEmail}`
    : job.applicationUrl;

  console.log(job.description);
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
          <h4>Location: {job.location}</h4>
          <h5>Salary: {job.salary}</h5>
          <h5>
            Responsibilities & Duties:{" "}
            <Markdown>{String(job.description)}</Markdown>
          </h5>
          <h5>
            {job.approved && (
              <Badge className="bg-green-600 text-black">Approved </Badge>
            )}
          </h5>
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
