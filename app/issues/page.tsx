import React from "react";
import prisma from "@/prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueStatusBadge from "@/components/shared/IssueStatusBadge";
import IssueActions from "./IssueActions";
import Link from "next/link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-5">
      <IssueActions />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">ISSUE</TableHead>
            <TableHead className="hidden md:table-cell md:font-bold md:text-black">
              STATUS
            </TableHead>
            <TableHead className="hidden md:table-cell md:font-bold md:text-black">
              CREATED AT
            </TableHead>
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
    </div>
  );
};

export default IssuesPage;
