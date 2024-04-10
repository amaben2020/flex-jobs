import { Job } from "@prisma/client";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
interface IJob {
  job: Job;
}
const JobCard = ({ job }: IJob) => {
  return (
    <div className="flex justify-between gap-x-6 border">
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

        <span className="flex items-center gap-x-4">
          <p>{job.salary}</p> <Banknote size={16} />
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
