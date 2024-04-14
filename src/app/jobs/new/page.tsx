import InfoTitle from "@/components/InfoTitle";
import NewJobForm from "@/components/NewJobForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post a new job",
};

const CreateJob = () => {
  return (
    <main>
      <InfoTitle
        mainText="Find your perfect developer"
        subText="Get your job posting seen by thousands of job seekers."
      />

      <NewJobForm />
    </main>
  );
};

export default CreateJob;
