"use server";
import { currentUser } from "@clerk/nextjs";

import prisma from "@db/db";
import { isAdmin } from "@utils/isAdmin";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type TFormState = {
  error?: string | undefined;
};
export const approveSubmission = async (
  prevState: TFormState,
  formData: FormData,
): Promise<TFormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Available");
    }

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        approved: true,
      },
    });

    // update data in home page
    revalidatePath("/");
    redirect("/admin");
  } catch (error) {
    let message: string = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};

export const deleteJob = async (
  prevState: TFormState,
  formData: FormData,
): Promise<TFormState> => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Available");
    }

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (job?.companyLogo) {
      await del(job.companyLogo);
    }
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    // update data in home page
    revalidatePath("/");
    redirect("/admin");
  } catch (error) {
    let message: string = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
};
