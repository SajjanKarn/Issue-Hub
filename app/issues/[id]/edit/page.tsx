import { GoBackButton } from "@/components/shared";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface EditIssuePageProp {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: EditIssuePageProp) => {
  if (typeof parseInt(id) !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  return (
    <div className="p-5">
      <GoBackButton href={`/issues/${id}`} />
      <h1 className="text-3xl mt-2 font-bold">Edit issue</h1>
      <IssueForm issue={issue!} />
    </div>
  );
};

export default EditIssuePage;
