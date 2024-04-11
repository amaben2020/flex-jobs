"use server";

import { redirect } from "next/navigation";

export const filterJobs = (formData: FormData) => {
  const allFormData = formData.entries();

  const { q, type, jobType, remote } = Object.fromEntries(allFormData);

  const buildParams = {
    ...(q && { q }),
    ...(type && { type }),
    ...(jobType && { jobType }),
    ...(remote && { remote: "true" }),
  };

  const searchParams = new URLSearchParams(buildParams as any);
  console.log("Search ", searchParams);
  redirect(`/?${searchParams.toString()}`);
};
