import { NextRequest, NextResponse } from "next/server";
import createIssueSchema from "@/schemas/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ errors: validation.error }, { status: 400 });
  }

  // create the issue
  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
