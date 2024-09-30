import { Skeleton } from "@/components/shared";

const NewIssueLoading = async () => {
  return (
    <div className="max-w-3xl">
      <div className="mt-5">
        <Skeleton width="100%" />
        <Skeleton width="100%" height="10rem" />
      </div>
    </div>
  );
};

export default NewIssueLoading;
