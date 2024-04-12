import { IHomePage } from "@/app/page";
import { jobTypes } from "@/lib/job-type";
import { jobFiltersValidation } from "@/schema/jobFiltersValidation";
import prisma from "../../../db/db";
import FormSubmitButton from "../FormSubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JobFilterSidebar = async ({
  action,
  filterValues,
}: {
  action: (formData: FormData) => void;
  filterValues: Pick<IHomePage, "searchParams">["searchParams"];
}) => {
  // use the zod parse function to validate server side

  const { q, type, location, remote } =
    jobFiltersValidation.parse(filterValues);
  console.log(
    "jobFiltersValidation.parse(filterValues)",
    jobFiltersValidation.parse(filterValues),
  );
  const locationData = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
    distinct: ["location"],
  });

  const jobLocations = locationData.filter((location) =>
    Boolean(location.location),
  );

  console.log(remote === "true");

  return (
    <aside className="sticky top-5 h-fit space-y-6 rounded-md border p-4">
      <form action={action}>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="q" className="mb-3 text-foreground">
            Sidebar
          </Label>
          <Input
            type="search"
            name="q"
            placeholder="Search jobs"
            defaultValue={q || ""}
          />

          <Label htmlFor="type" className="mb-1 mt-3 text-foreground">
            Type
          </Label>
          <select
            name="type"
            defaultValue={type || ""}
            className="shadcn-input"
          >
            <option>All Types</option>
            {jobTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <Label htmlFor="location" className="mb-1 mt-3 text-foreground">
            All Location
          </Label>
          <select
            className="shadcn-input"
            name="location"
            defaultValue={location || ""}
          >
            <option>All location</option>
            {jobLocations.map((location) => (
              <option key={location.location}>{location.location}</option>
            ))}
          </select>

          <Label htmlFor="remote" className="mb-3 text-foreground">
            Remote Jobs
          </Label>
          <Input
            placeholder="Remote"
            type="checkbox"
            className="mr-auto h-[25px] w-[40px] cursor-pointer border accent-black"
            name="remote"
            id="remote"
            defaultValue={remote}
            // checked={remote === "true"}
          />
        </div>

        <FormSubmitButton type="submit" className="mt-4">
          Submit
        </FormSubmitButton>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
