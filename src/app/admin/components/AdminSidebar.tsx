"use client";
import FormSubmitButton from "@/components/FormSubmitButton";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "../actions";

const AdminSidebar = ({ job }: { job: any }) => {
  return (
    <aside>
      AdminSidebar
      {job.approved ? (
        <span className="bg-green-500 text-center">Approved</span>
      ) : (
        <ApproveSubmissionButton jobId={job.id} />
      )}
      <ApproveDeleteButton jobId={job.id} />
    </aside>
  );
};

function ApproveSubmissionButton({ jobId }: any) {
  //@ts-ignore
  const [formState, formAction] = useFormState(approveSubmission, undefined);
  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />

      <FormSubmitButton className="w-full bg-yellow-500">
        Approve
      </FormSubmitButton>

      {formState?.error && <p>{formState.error}</p>}
    </form>
  );
}

function ApproveDeleteButton({ jobId }: any) {
  //@ts-ignore
  const [formState, formAction] = useFormState(deleteJob, undefined);
  return (
    <form action={formAction} key="deleteJob">
      <input type="hidden" name="jobId" value={jobId} />

      <FormSubmitButton className="w-full bg-red-500">Delete</FormSubmitButton>

      {formState?.error && <p>{formState?.error}</p>}
    </form>
  );
}

export default AdminSidebar;
