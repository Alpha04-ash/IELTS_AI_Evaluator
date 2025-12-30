import { NextResponse } from "next/server";
import { getMockExam } from "@/lib/scraper/ielts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") as any || "READING";

  // For now, return mock data to ensure the UI works. 
  // Real scraping can be triggered based on params later.
  const exam = getMockExam(type);

  return NextResponse.json(exam);
}
