import z from "zod";

export const jobFiltersValidation = z.object({
  q: z.string(),
  type: z.string(),
  location: z.string(),
  remote: z.string(),
});
