"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlinePlus } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Add a new issue</h1>

      <form
        className="max-w-3xl"
        onSubmit={handleSubmit(async (data) => {
          const res = await axios.post("/api/issue", data);
          if (res.status === 201) {
            router.push("/issues");
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
