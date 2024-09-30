"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlinePlus } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import createIssueSchema from "@/schemas/validationSchema";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Add a new issue</h1>

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

      <form
        className="max-w-3xl"
        onSubmit={handleSubmit(async (data) => {
          try {
            const res = await axios.post("/api/issue", data);
            if (res.status === 201) {
              router.push("/issues");
            }
          } catch (err) {
            setError("An error occurred while creating the issue.");
          }
        })}
      >
        <div className="mt-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input placeholder="Title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500 text-sm my-2">{errors.title.message}</p>
          )}
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
          />
          {errors.description && (
            <p className="text-red-500 text-sm my-2">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mt-5">
          <Button type="submit">
            <AiOutlinePlus />
            Add Issue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuesPage;
