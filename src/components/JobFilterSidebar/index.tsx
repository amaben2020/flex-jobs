import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JobFilterSidebar = ({
  action,
}: {
  action: (formData: FormData) => void;
}) => {
  return (
    <aside>
      <form action={action}>
        <Label htmlFor="q" className="text-black">
          Sidebar
        </Label>
        <Input name="q" />

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
