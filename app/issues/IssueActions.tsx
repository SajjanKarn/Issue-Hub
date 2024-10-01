import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: { label: string; value?: string }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueActions = () => {
  return (
    <div>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status...  " />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.label} value={status.value as string}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Link href="/issues/new">
            <Button>New Issue</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueActions;
