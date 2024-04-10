import { Job } from "@prisma/client";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../../../utils/formatCurrency";
interface IJob {
  job: Job;
}
const JobCard = ({ job }: IJob) => {
  return (
    <div className="flex justify-between gap-x-6 rounded-md border p-3 shadow-sm">
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
        <h3>{job.title}</h3>

        <span className="flex items-center gap-x-3">
          <Banknote size={16} /> <p>{formatCurrency(job.salary)}</p>
        </span>

        <Globe2 size={16} />
        <MapPin size={16} />
        <Clock size={16} />
        {/* <p>{job.description}</p> */}
      </div>
    </div>
  );
};

export default JobCard;
