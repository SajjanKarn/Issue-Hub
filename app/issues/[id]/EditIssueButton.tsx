import { Button } from "@/components/ui/button";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";

const EditIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <Link href={`/issues/${issue.id}/edit`}>
      <Button className="flex w-[100%] gap-x-1">
        <AiFillEdit />
        Edit
      </Button>
    </Link>
  );
};

export default EditIssueButton;
