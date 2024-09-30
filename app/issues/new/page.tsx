import React from "react";
import IssueForm from "../_components/IssueForm";
import { GoBackButton } from "@/components/shared";

const NewIssueForm = () => {
  return (
    <div className="p-5">
      <GoBackButton href="/issues" />
      <h1 className="text-3xl mt-2 font-bold">Add a new issue</h1>
      <IssueForm />
    </div>
  );
};

export default NewIssueForm;
