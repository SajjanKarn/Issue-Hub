import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <div className="p-3">
      <Link href="/issues/new">
        <Button>New Issue</Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
