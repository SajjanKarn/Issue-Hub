import React from "react";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueStatusBadge from "@/components/shared/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-5">
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>
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
                {issue.title}
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
