import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
    <div className="p-5">
      <Link href="/issues">
        <Button variant="destructive">Go Back</Button>
      </Link>
      <div className="mt-5">
        <h1 className="text-4xl font-bold">{issue.title}</h1>
        <div className="flex gap-x-5 my-2">
          <IssueStatusBadge status={issue.status} />
          <span className="text-zinc-600">
            {issue.createdAt.toDateString()}
          </span>
        </div>
      </div>

      <div className="mt-3 prose">
        <Card className="prose p-5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    </div>
  );
};

export default IssueDetail;
