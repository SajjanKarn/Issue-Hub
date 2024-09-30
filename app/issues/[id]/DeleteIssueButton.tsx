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
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteIssue = async () => {
    try {
      const response = await axios.delete(`/api/issue/${issue.id}`);
      if (response.status === 200) {
        router.push("/issues");
        router.refresh();
      }
      // eslint-disable-next-line
    } catch (error) {
      setError(true);
    }
  };

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
              onClick={deleteIssue}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={error}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Something went wrong!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            An error occurred while deleting the issue. Please try again later.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 transition-colors"
              onClick={() => setError(false)}
            >
              Dismiss
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteIssueButton;
