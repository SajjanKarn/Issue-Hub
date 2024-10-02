"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface IssuePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

const IssuePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
}: IssuePaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPage = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPage) {
    currentPage = totalPage;
  }

  if (totalPage <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="text-center flex flex-col gap-3">
      <p>
        Showing {currentPage} out of {totalPage} pages
      </p>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={() => changePage(currentPage - 1)} />
            </PaginationItem>
          )}
          {
            // generate 3 pages based on current page number only if current page is not the last page
            Array.from({ length: 3 }).map((_, index) => {
              const page = currentPage + index;
              if (page > totalPage) return null;

              return (
                <PaginationItem
                  key={page}
                  className={`cursor-pointer ${
                    page === currentPage
                      ? "bg-gray-100 text-black rounded-sm"
                      : ""
                  }`}
                  onClick={() => changePage(page)}
                >
                  <PaginationLink>{page}</PaginationLink>
                </PaginationItem>
              );
            })
          }
          {
            // render pagination ellipsis if current page is not the last page
            currentPage + 3 < totalPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          {currentPage < totalPage && (
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={() => changePage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default IssuePagination;
