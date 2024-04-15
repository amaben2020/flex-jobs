"use server";
import { nanoid } from "nanoid";
import { createJobSchema } from "@/schema/createJobSchema";
import path from "path";
import { put } from "@vercel/blob";
import { toSlug } from "@utils/toSlug";
import prisma from "@db/db";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
  //convert the formData into an object with Object.fromEntries([])
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    location,
    type,
    companyLogo,
    companyName,
    locationType,
    salary,
    applicationEmail,
    applicationUrl,
    description,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;
  // upload to vercel blob storage
  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    companyLogoUrl = blob.url;
  }

  // sending data to db
  await prisma.job.create({
    data: {
      title: title.trim(),
      locationType,
      location,
      slug,
      type,
      companyName: companyName.trim(),
      description: description?.trim(),
      companyLogo: String(companyLogoUrl),
      salary: parseInt(salary),
      approved: true,
      applicationEmail,
      applicationUrl: applicationUrl?.trim(),
    },
  });

  redirect("/job-submitted");
}
