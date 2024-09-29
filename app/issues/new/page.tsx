"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Issue {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const [issue, setIssue] = useState<Issue>({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(issue);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold">Add a new issue</h1>

      <form className="max-w-3xl" onSubmit={handleFormSubmit}>
        <div className="mt-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            placeholder="Title"
            id="title"
            value={issue.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={issue.description}
            onChange={handleInputChange}
            placeholder="Description"
            name="description"
            rows={5}
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
