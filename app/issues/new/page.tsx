import { GoBackButton } from "@/components/shared";
import dynamic from "next/dynamic";
import IssueFormLoading from "../_components/IssueFormLoading";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

const NewIssueForm = () => {
  return (
    <div className="p-5">
      <GoBackButton href="/issues" />
      <h1 className="text-3xl mt-2 font-bold">Add a new issue</h1>
      <IssueForm />
    </div>
  );
};

export default NewIssueForm;
