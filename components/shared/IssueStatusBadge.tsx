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

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge
      className={`bg-${statusMap[status].color} hover:bg-${
        statusMap[status].color.split("-")[0]
      }-${Number(statusMap[status].color.split("-")[1]) + 100}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
