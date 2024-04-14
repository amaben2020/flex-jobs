import { jobTypes, locationTypes } from "@/lib/job-type";
import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const applicationSchema = z.object({
  applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
  applicationUrl: z
    .string()
    .max(100)
    .url()
    .optional()
    .refine((data: any) => data.applicationEmail | data.applicationUrl, {
      message: "Email or URL is required",
      path: ["applicationEmail"],
    }),
});
const locationSchema = z.object({
  locationType: requiredString.refine(
    (value) => locationTypes.includes(value),
    "Invalid location type",
  ),
  location: z
    .string()
    .max(100)
    .optional()
    .refine(
      (data: any) =>
        !data.locationType || data.locationType === "Remote" || data.location,
      {
        message: "Location is required for on-site jobs",
        path: ["location"],
      },
    ),
});
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
    salary: numericRequiredString.max(9, "Number cant be longer than 9 digits"),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type TCreateJobSchema = z.infer<typeof createJobSchema>;
