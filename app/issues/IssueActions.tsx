import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div>
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>New Issue</Button>
        </Link>
      </div>
    </div>
  );
};

export default IssueActions;
