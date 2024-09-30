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

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-3">
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ISSUE</TableHead>
            <TableHead className="hidden md:table-cell">STATUS</TableHead>
            <TableHead className="hidden md:table-cell">CREATED AT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                {issue.title}
                <p className="my-1 md:hidden">
                  <span className="bg-gray-100 p-1 my-1 rounded-sm">
                    {issue.status}
                  </span>
                </p>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.status}
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
