"use client";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Spinner from "@/components/shared/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import issueSchema from "@/schemas/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import SimpleMDE from "react-simplemde-editor";

import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

interface IssueFormProp {
  issue?: Issue;
}

const IssueForm = ({ issue }: IssueFormProp) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      if (issue) {
        const res = await axios.patch(`/api/issue/${issue.id}`, data);
        if (res.status === 200) {
          router.push(`/issues/${issue.id}`);
        }
        return;
      }
      const res = await axios.post("/api/issue", data);
      if (res.status === 201) {
        router.push("/issues");
        router.refresh();
      }
      // eslint-disable-next-line
    } catch (err) {
      setError("An error occurred while creating the issue.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div>
      {error && (
        <div className="max-w-3xl mt-2">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Please check the form for any errors and try again.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <form className="max-w-3xl" onSubmit={onSubmit}>
        <div className="mt-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        <div className="mt-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
            defaultValue={issue?.description}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            className="flex gap-x-3"
            disabled={isSubmitting}
          >
            {issue ? <AiOutlineEdit /> : <AiOutlinePlus />}
            {issue ? "Update Issue" : "Create Issue"}
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
