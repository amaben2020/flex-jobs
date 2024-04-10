"use server";
export const filterJobs = (formData: FormData) => {
  const query = formData.get("q");
  console.log(query);
};
