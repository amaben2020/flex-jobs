"use server";

import { createJobSchema } from "@/schema/createJobSchema";

export async function createJobPosting(formData: FormData) {
  //convert the formData into an object with Object.fromEntries([])
  const values = Object.fromEntries(formData.entries());

  const { title, location, type, companyLogo, companyName, locationType } =
    createJobSchema.parse(values);
}
