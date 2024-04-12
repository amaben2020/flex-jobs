import z from "zod";

export const jobFiltersValidation = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.string().optional(),
});

export type TJobFilterSchema = z.infer<typeof jobFiltersValidation>;
