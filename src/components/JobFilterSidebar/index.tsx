import FormSubmitButton from "../FormSubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JobFilterSidebar = ({
  action,
}: {
  action: (formData: FormData) => void;
}) => {
  return (
    <aside className="space-y-6 rounded-md border p-4">
      <form action={action}>
        <Label htmlFor="q" className="text-foreground">
          Sidebar
        </Label>
        <Input name="q" placeholder="Search jobs" />

        <FormSubmitButton type="submit" className="mt-4 w-full">
          Submit
        </FormSubmitButton>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
