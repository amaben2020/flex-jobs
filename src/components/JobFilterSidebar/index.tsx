import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JobFilterSidebar = () => {
  return (
    <aside>
      <form action="">
        <Label htmlFor="q" className="text-black">
          Sidebar
        </Label>
        <Input name="q" />
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
