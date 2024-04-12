import { IHomePage } from "@/app/page";
import { jobTypes } from "@/lib/job-type";
import { jobFiltersValidation } from "@/schema/jobFiltersValidation";
import { ListFilter } from "lucide-react";
import Link from "next/link";
import prisma from "../../../db/db";
import FormSubmitButton from "../FormSubmitButton";
import { Button } from "../ui/button";
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
  const isClearable =
    q?.length || type?.length || location?.length || remote === "true";
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

  //the key on the form is super important so that React compares the old values with it and force React to rerender if there's a change

  return (
    <aside className="sticky top-5 h-fit space-y-6 rounded-md border p-4 transition-all duration-100">
      <form action={action} key={JSON.stringify({ q, type, location, remote })}>
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="q" className="mb-3 text-foreground">
            Sidebar
          </Label>
          <Input
            type="search"
            name="q"
            placeholder="Search jobs"
            defaultValue={q ?? ""}
          />

          <Label htmlFor="type" className="mb-1 mt-3 text-foreground">
            Type
          </Label>
          <select
            name="type"
            defaultValue={type ?? ""}
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
            defaultValue={location ?? ""}
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
            defaultValue={String(remote)}
            value={String(remote)}
            // checked={String(remote) === "true"}
          />
        </div>

        <FormSubmitButton type="submit" className="mt-4">
          Submit
        </FormSubmitButton>
      </form>

      {isClearable && (
        <Button asChild variant="ghost" className="w-full font-bold">
          <Link href="/">
            <span className="flex items-center gap-x-2">
              <p> Clear Filter</p>
              <ListFilter size={16} />
            </span>
          </Link>
        </Button>
      )}
    </aside>
  );
};

export default JobFilterSidebar;
