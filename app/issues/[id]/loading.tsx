import { Skeleton } from "@/components/shared";
import GoBackButton from "@/components/shared/GoBackButton";

const IssueDetailLoading = () => {
  return (
    <div className="p-5">
      <GoBackButton href="/issues" />
      <div className="mt-5">
        <h1 className="text-4xl font-bold">
          <Skeleton width="10rem" />
        </h1>
        <div className="flex gap-x-5 my-2">
          <Skeleton width="3rem" />
          <span className="text-zinc-600">
            <Skeleton width="5rem" />
          </span>
        </div>
      </div>

      <div className="mt-3 prose">
        <Skeleton count={5} />
      </div>
    </div>
  );
};

export default IssueDetailLoading;
