import { cn } from "@/lib/utils";
import { Job } from "@prisma/client";
import { format } from "date-fns";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../../../utils/formatCurrency";
import { Badge } from "../ui/badge";
interface IJob {
  job: Job;
}
const JobCard = ({ job }: IJob) => {
  const renderLocationTypeColor =
    job.locationType === "Hybrid"
      ? "bg-yellow-500"
      : job.locationType === "On-site"
        ? "bg-green-500"
        : "bg-blue-500";
  return (
    <div className="mb-4 flex justify-between gap-x-6 space-y-3 rounded-md border p-2 shadow-sm">
      <div>
        <Image
          width={100}
          height={100}
          className="self-center rounded-lg"
          src={job.companyLogo || ""}
          alt=""
        />
      </div>

      <div className="flex-grow space-y-4">
        <h3 className="text-foreground">{job.title}</h3>
        <Badge className={cn(renderLocationTypeColor)}>{job.type}</Badge>
        <span className="flex items-center gap-x-3">
          <Banknote size={16} /> <p>{formatCurrency(job.salary)}</p>
        </span>
        <span className="flex items-center gap-x-3">
          <Globe2 size={16} /> <p>{job.locationType}</p>
        </span>{" "}
        <span className="flex items-center gap-x-3">
          <MapPin size={16} /> <p>{job.location}</p>
        </span>{" "}
        <span className="flex items-center gap-x-3">
          <Clock size={16} />{" "}
          <p>
            Posted on:
            {format(new Date(job?.createdAt), "yyyy-mm-dd")}
          </p>
        </span>
      </div>
    </div>
  );
};

export default JobCard;
