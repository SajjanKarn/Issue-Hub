import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <div className="mt-5">
        <h1 className="text-4xl font-bold">{issue.title}</h1>
        <div className="flex gap-x-5 my-2">
          <IssueStatusBadge status={issue.status} />
          <span className="text-zinc-600">
            {issue.createdAt.toDateString()}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <Card className="prose max-w-full p-5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
    </>
  );
};

export default IssueDetails;
