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

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 md:flex-row md:items-start">
      <section className="w-full grow space-y-5">
        <div className="items-center gap-3">
          {job.companyLogo && (
            <Image
              src={job.companyLogo}
              alt="Company logo"
              width={100}
              height={100}
              className="rounded-xl"
            />
          )}
          <p className="text-black">{JSON.stringify(job)}</p>
        </div>
      </section>
    </main>
  );
};

export default JobPage;
