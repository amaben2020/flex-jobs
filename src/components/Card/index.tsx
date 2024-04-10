import { Job } from "@prisma/client";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
interface IJob {
  job: Job;
}
const JobCard = ({ job }: IJob) => {
  console.log(job);
  return (
    <div className="flex justify-between border">
      <div>
        <Image
          width={100}
          height={100}
          className="self-center rounded-lg"
          src={job.companyLogo || ""}
          alt=""
        />
      </div>

      <div className="flex-grow">
        <h3>{job.title}</h3>
        <Banknote size={16} />
        <Globe2 />
        <MapPin />
        <Clock />
        {/* <p>{job.description}</p> */}
      </div>
    </div>
  );
};

export default JobCard;
