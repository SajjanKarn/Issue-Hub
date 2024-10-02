import prisma from "@/prisma/client";

import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { AiOutlineArrowUp } from "react-icons/ai";
import IssuePagination from "../IssuePagination";
import { Metadata } from "next";

interface IssuePageProps {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  {
    label: "ISSUE",
    value: "title",
    className: "font-bold text-black",
  },
  {
    label: "STATUS",
    value: "status",
    className: "hidden md:table-cell md:font-bold md:text-black",
  },
  {
    label: "CREATED AT",
    value: "createdAt",
    className: "hidden md:table-cell md:font-bold md:text-black",
  },
];

const IssuesPage = async ({ searchParams }: IssuePageProps) => {
  const statusList = Object.values(Status);
  const validStatus = statusList.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status: validStatus };

  const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalItems = await prisma.issue.count({ where });

  return (
    <div className="p-5 lg:px-10">
      <IssueActions />
      {issues.length > 0 ? (
        <>
          <Table className="mb-3">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.label} className={column.className}>
                    <Link
                      href={{
                        query: {
                          ...searchParams,
                          orderBy: column.value,
                        },
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        {column.label}
                        {column.value === searchParams.orderBy && (
                          <AiOutlineArrowUp />
                        )}
                      </div>
                    </Link>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-violet-700 hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <div className="md:hidden">
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {issue.createdAt.toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <IssuePagination
            totalItems={totalItems}
            itemsPerPage={pageSize}
            currentPage={page}
          />
        </>
      ) : (
        <p>No issues published yet.</p>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IssueHub | Issues",
  description: "View all issues published on IssueHub.",
};

export default IssuesPage;
