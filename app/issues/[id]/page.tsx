import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface IssueDetailProp {
  params: { id: string };
}

const IssueDetail = async ({ params: { id } }: IssueDetailProp) => {
  if (typeof parseInt(id) !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
    </div>
  );
};

export default IssueDetail;
