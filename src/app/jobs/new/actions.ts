"use server";
import { nanoid } from "nanoid";
import { createJobSchema } from "@/schema/createJobSchema";

import { put } from "vercel/blob";
import { toSlug } from "@utils/toSlug";

export async function createJobPosting(formData: FormData) {
  //convert the formData into an object with Object.fromEntries([])
  const values = Object.fromEntries(formData.entries());

  const { title, location, type, companyLogo, companyName, locationType } =
    createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;
  // upload to vercel blob storage
  let companyLogoUrl: string | undefined = undefined;
}
