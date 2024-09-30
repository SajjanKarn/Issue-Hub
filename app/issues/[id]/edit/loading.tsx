import { Skeleton } from "@/components/shared";

const EditIssueLoading = () => {
  return (
    <div className="max-w-3xl p-5">
      <div className="mt-5">
        <Skeleton width="100%" height="2rem" />
        <div className="mt-5">
          <Skeleton width="100%" height="20rem" />
        </div>
      </div>
    </div>
  );
};

export default EditIssueLoading;
