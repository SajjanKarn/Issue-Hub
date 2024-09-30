import React from "react";
import Skeleton from "react-loading-skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";

const IssueListLoading = () => {
  const issues = [1, 2, 3, 4, 5];
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
            <TableRow key={issue}>
              <TableCell>
                <Skeleton />
                <div className="md:hidden">
                  <Skeleton />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueListLoading;
