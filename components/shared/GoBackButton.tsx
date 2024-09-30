import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const GoBackButton = ({ href = "/" }: { href: string }) => {
  return (
    <Link href={href}>
      <Button variant="destructive">Go Back</Button>
    </Link>
  );
};

export default GoBackButton;
