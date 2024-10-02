import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

const Home = async () => {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <div className="p-5 grid grid-cols-1 gap-3 xl:grid-cols-3 lg:p-10 overflow-x-hidden">
      <div className="xl:col-span-1">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </div>
      <div className="xl:col-span-2">
        <LatestIssues />
      </div>
    </div>
  );
};

export default Home;
