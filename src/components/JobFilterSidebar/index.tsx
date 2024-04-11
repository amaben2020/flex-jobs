import { IHomePage } from "@/app/page";
import FormSubmitButton from "../FormSubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JobFilterSidebar = ({
  action,
  filterValues,
}: {
  action: (formData: FormData) => void;
  filterValues: Pick<IHomePage, "searchParams">["searchParams"];
}) => {
  const { q, type } = filterValues;

  return (
    <aside className="space-y-6 rounded-md border p-4">
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
          <select>
            <option>All Types</option>
          </select>

          <Label htmlFor="location" className="mb-3 text-foreground">
            All Location
          </Label>
          <select>
            <option> All location</option>
          </select>

          <input type="checkox" />
        </div>

        <FormSubmitButton type="submit" className="mt-4 w-full">
          Submit
        </FormSubmitButton>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
