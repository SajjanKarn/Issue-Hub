import { Button } from "@/components/ui/button";

import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssignUserGroup from "./AssignUserGroup";
import { cache } from "react";

interface IssueDetailProp {
  params: { id: string };
}

const fetchIssue = cache(async (id: string) =>
  prisma.issue.findUnique({
    where: { id: parseInt(id) },
  })
);

const IssueDetailPage = async ({ params: { id } }: IssueDetailProp) => {
  const session = await getServerSession(authOptions);
  if (typeof parseInt(id) !== "number") notFound();

  const issue = await fetchIssue(id);

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
          <div className="flex flex-col xl:flex-row gap-3">
            {session && (
              <>
                <AssignUserGroup issue={issue} />
                <EditIssueButton issue={issue} />
                <DeleteIssueButton issue={issue} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateMetadata({ params: { id } }: IssueDetailProp) {
  const issue = await fetchIssue(id);

  return {
    title: `Issue: ${issue?.title}`,
    description: issue?.description,
  };
}

export default IssueDetailPage;
