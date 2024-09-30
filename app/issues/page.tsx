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

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-5">
      <IssueActions />
      {issues.length > 0 ? (
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
      ) : (
        <p>No issues published yet.</p>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
