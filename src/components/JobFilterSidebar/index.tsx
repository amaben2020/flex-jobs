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
  const params = filterValues;
  console.log("param", params);

  return (
    <aside className="space-y-6 rounded-md border p-4">
      <form action={action}>
        <Label htmlFor="q" className="mb-3 text-foreground">
          Sidebar
        </Label>
        <Input name="q" placeholder="Search jobs" defaultValue={params?.q} />

        <FormSubmitButton type="submit" className="mt-4 w-full">
          Submit
        </FormSubmitButton>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
