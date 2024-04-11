import { Job } from "@prisma/client";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../../../utils/formatCurrency";
interface IJob {
  job: Job;
}
const JobCard = ({ job }: IJob) => {
  return (
    <div className="mb-4 flex justify-between gap-x-6 space-y-6 rounded-md border p-3 shadow-sm">
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
          <Clock size={16} /> <p>{job.type}</p>
        </span>
      </div>

      <p>Posted on: </p>
    </div>
  );
};

export default JobCard;
