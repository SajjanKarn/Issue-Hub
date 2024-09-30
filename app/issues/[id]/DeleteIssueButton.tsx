"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Issue } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="flex gap-x-1" variant="destructive">
            <AiFillDelete />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              issue <strong className="text-red-500">{issue.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 transition-colors"
              onClick={async () => {
                const response = await axios.delete(`/api/issue/${issue.id}`);
                if (response.status === 200) {
                  router.push("/issues");
                  router.refresh();
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteIssueButton;
