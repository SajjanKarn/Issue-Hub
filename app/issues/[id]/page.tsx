import { Button } from "@/components/ui/button";

import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface IssueDetailProp {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailProp) => {
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="col-span-2">
          <IssueDetails issue={issue} />
        </div>
        <div>
          <div className="flex flex-col lg:flex-row gap-3">
            <EditIssueButton issue={issue} />
            <DeleteIssueButton issue={issue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
