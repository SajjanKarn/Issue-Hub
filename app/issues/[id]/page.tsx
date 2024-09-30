import { Button } from "@/components/ui/button";

import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div>
          <IssueDetails issue={issue} />
        </div>
        <div>
          <EditIssueButton issue={issue} />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
