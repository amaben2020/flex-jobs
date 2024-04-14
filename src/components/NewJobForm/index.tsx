"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { createJobSchema, TCreateJobSchema } from "@/schema/createJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobTypes, locationTypes } from "@/lib/job-type";
import { optional } from "zod";
import FormSubmitButton from "../FormSubmitButton";
import LocationInput from "../LocationInput";
import { Label } from "../ui/label";

const NewJobForm = () => {
  const form = useForm<TCreateJobSchema>({
    resolver: zodResolver(createJobSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    trigger,
    control,
    setValue,
    setFocus,
  } = form;
  const onSubmit = async (values: TCreateJobSchema) => {
    console.log(values);
  };
  return (
    <main className="m-auto my-10 max-w-3xl space-x-10">
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2>Job Details</h2>

          <Form {...form}>
            {/* novalidate disables default browser validation */}
            <form
              action=""
              className="space-y-4"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="eg Frontend developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="type"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <select
                      {...field}
                      defaultValue=""
                      className="shadcn-input ml-3"
                    >
                      <option value="">Select an option</option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </select>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg Stripe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="companyLogo"
                render={({ field }) => {
                  console.log(field);
                  console.log(field.value);

                  return (
                    <FormItem>
                      <FormLabel>Company Logo</FormLabel>
                      <FormControl>
                        <Input
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                          {...field.value}
                          type="file"
                          accept="image/*"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Location {watch("location") && `: ${watch("location")}`}{" "}
                    </FormLabel>
                    <FormControl>
                      <LocationInput
                        type="search"
                        placeholder="Search for city"
                        onLocationSelected={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor="applicationEmail">How to apply</Label>
              </div>

              <div className="flex items-center justify-between">
                {/* The email is only required when we do not provide application url */}
                <FormField
                  name="applicationEmail"
                  control={control}
                  render={(field) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          id="applicationEmail"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p className="mx-3">OR</p>
                <FormField
                  name="applicationUrl"
                  control={control}
                  render={(field) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          id="applicationUrl"
                          placeholder="Enter url e.g www."
                          type="url"
                          onChange={(e) => {
                            field.field.onChange(e);
                            // trigger the applicationEmail validation
                            trigger("applicationEmail");
                          }}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="locationType"
                render={(field) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <select
                      {...field}
                      defaultValue=""
                      className="shadcn-input ml-3"
                    >
                      <option value="">Select an option</option>
                      {locationTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </select>
                  </FormItem>
                )}
              />
              <FormSubmitButton>Submit</FormSubmitButton>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default NewJobForm;
