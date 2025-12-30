import { NextResponse } from "next/server";
import { gradeIELTSTask } from "@/lib/ai/gemini";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { type, taskData, userInput } = await req.json();

    const result = await gradeIELTSTask(type, taskData, userInput);

    // Save result to database
    await prisma.result.create({
      data: {
        userId: (session.user as any).id,
        type,
        score: result.score,
        feedback: result.feedback,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Grading API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
