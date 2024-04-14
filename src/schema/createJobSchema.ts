import { jobTypes } from "@/lib/job-type";
import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: z
      .custom<File | undefined>()
      .refine((file) => {
        return (
          !file || (file instanceof File && file.type.startsWith("image/"))
        );
      }, "Must be an image file")
      .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
      }, "File must be less than 2mb"),
    description: requiredString.max(5000).optional(),
    salary: numericRequiredString.max(9),
  })
  .and(applicationSchema)
  .and(locationSchema);
