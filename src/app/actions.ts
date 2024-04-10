"use server";

import { redirect } from "next/navigation";

export const filterJobs = (formData: FormData) => {
  const query = formData.get("q");
  //Object.fromEntries:
  console.log("FD", formData.entries());
  console.log(query);

  redirect(`/?q=${query}`);
};
