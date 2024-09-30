import { Button } from "@/components/ui/button";
import { Issue } from "@prisma/client";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
  return (
    <Link href={`/issues/${issue.id}/edit`}>
      <Button className="flex w-[100%] gap-x-1" variant="destructive">
        <AiFillDelete />
        Delete
      </Button>
    </Link>
  );
};

export default DeleteIssueButton;
