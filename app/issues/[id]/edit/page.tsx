import { GoBackButton } from "@/components/shared";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormLoading from "../../_components/IssueFormLoading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

interface EditIssuePageProp {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: EditIssuePageProp) => {
  if (typeof parseInt(id) !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="p-5">
      <GoBackButton href={`/issues/${id}`} />
      <h1 className="text-3xl mt-2 font-bold">Edit issue</h1>
      <IssueForm issue={issue!} />
    </div>
  );
};

export default EditIssuePage;
