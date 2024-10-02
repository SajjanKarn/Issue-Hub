import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Status } from "@prisma/client";
import classNames from "classnames";

interface IssueSummaryProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: IssueSummaryProps) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:justify-normal gap-3 mb-5">
      {statuses.map((status) => (
        <Card key={status.label} className="max-w-[200px]">
          <CardHeader>
            <CardTitle className="font-medium text-md lg:text-[15px]">
              {status.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription
              className={classNames({
                "text-black font-bold text-2xl lg:text-3xl": true,
                "text-red-500": status.status === "OPEN",
                "text-violet-500": status.status === "IN_PROGRESS",
                "text-green-700": status.status === "CLOSED",
              })}
            >
              {status.value}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default IssueSummary;
