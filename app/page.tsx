import IssuePagination from "./IssuePagination";

const Home = ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <div>
      <IssuePagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
};

export default Home;
