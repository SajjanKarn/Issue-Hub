import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/schemas/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid body." }, { status: 400 });
    }

    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.format() },
        { status: 400 }
      );
    }

    const { assignedToUserId, title, description } = body;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
      if (!user) {
        return NextResponse.json(
          { error: "Invalid user ID." },
          { status: 400 }
        );
      }
    }

    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!issue) {
      return NextResponse.json({ error: "Invalid issue." }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title: title,
        description: description,
        assignedToUserId,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
    // eslint-disable-next-line
  } catch (e) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(deletedIssue, { status: 200 });
}
