import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

const statusMap: Record<
  Status,
  { label: string; color: "red-500" | "violet-500" | "green-700" }
> = {
  OPEN: { label: "Open", color: "red-500" },
  IN_PROGRESS: { label: "In progress", color: "violet-500" },
  CLOSED: { label: "Closed", color: "green-700" },
};

const generateBackground = (status: Status): string => {
  switch (status) {
    case "OPEN":
      return "bg-red-500 hover:bg-red-600";
    case "IN_PROGRESS":
      return "bg-violet-500 hover:bg-violet-600";
    case "CLOSED":
      return "bg-green-700 hover:bg-green-800";
  }
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className={`${generateBackground(status)}`}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
