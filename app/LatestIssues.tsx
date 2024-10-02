import { IssueStatusBadge } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/prisma/client";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl">Latest Issues</CardTitle>
        </CardHeader>

        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="p-3 my-3 flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="text-md text-blue-700 hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <div>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                  </div>
                  {issue.assignedToUser && (
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={issue.assignedToUser?.image as string}
                          referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>
                          {issue.assignedToUser?.name}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default LatestIssues;
