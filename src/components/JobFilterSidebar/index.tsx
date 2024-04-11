import { IHomePage } from "@/app/page";
import { jobTypes } from "@/lib/job-type";
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
  const { q, type, location, remote } = filterValues;

  const locationData = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      location: true,
    },
    distinct: ["location"],
  });

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

          <Label htmlFor="type" className="mb-3 text-foreground">
            Type
          </Label>
          <select name="type" defaultValue={type || ""}>
            <option>All Types</option>
            {jobTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <Label htmlFor="location" className="mb-3 text-foreground">
            All Location
          </Label>
          <select name="location" defaultValue={location || ""}>
            <option>All location</option>
            {locationData.map((location) => (
              <option key={location.location}>{location.location}</option>
            ))}
          </select>

          <Label htmlFor="location" className="mb-3 text-foreground">
            Remote
          </Label>

          <input
            type="checkbox"
            className="scale-125 border accent-black"
            name="remote"
            defaultValue={remote || ""}
          />
        </div>

        <FormSubmitButton type="submit" className="mt-4 w-full">
          Submit
        </FormSubmitButton>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
