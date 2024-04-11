"use server";

import { redirect } from "next/navigation";

export const filterJobs = (formData: FormData) => {
  const allFormData = formData.entries();

  const { q, type, location, remote } = Object.fromEntries(allFormData);

  const buildParams = {
    ...(q && { q }),
    ...(location && { location }),
    ...(type && { type }),
    ...(remote && { remote: "true" }),
  };

  const searchParams = new URLSearchParams(buildParams as any);

  redirect(`/?${searchParams.toString()}`);
};
