import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="mx-auto my-auto">
      <Loader2 size={50} className="animate-spin" />
    </div>
  );
};

export default Loading;
