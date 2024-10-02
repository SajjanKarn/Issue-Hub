import LatestIssues from "./LatestIssues";

const Home = ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <div className="p-5 lg:p-10">
      <LatestIssues />
    </div>
  );
};

export default Home;
