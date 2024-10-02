"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: string }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueActions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <Select
            defaultValue={searchParams.get("status") || "ALL"}
            onValueChange={(status) => {
              const params = new URLSearchParams();
              if (status) params.append("status", status);
              if (searchParams.get("orderBy"))
                params.append("orderBy", searchParams.get("orderBy") as string);

              const query = params.size ? `?${params.toString()}` : "";

              router.push("/issues" + query);
            }}
          >
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
