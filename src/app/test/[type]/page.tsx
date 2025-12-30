import ReadingTest from "@/components/test/reading-test";
import ListeningTest from "@/components/test/listening-test";
import WritingTest from "@/components/test/writing-test";
import SpeakingTest from "@/components/test/speaking-test";
import { getMockExam } from "@/lib/scraper/ielts";
import { notFound } from "next/navigation";
import TestSelection from "@/components/test/test-selection";
import { readingTests } from "@/lib/data/reading-tests";
import { listeningTests } from "@/lib/data/listening-tests";
import { writingTests } from "@/lib/data/writing-tests";
import { speakingTests } from "@/lib/data/speaking-tests";

export default async function TestPage({ 
  params,
  searchParams 
}: { 
  params: { type: string },
  searchParams: { testId?: string }
}) {
  const type = params.type.toUpperCase() as any;
  const validTypes = ["READING", "LISTENING", "WRITING", "SPEAKING"];

  if (!validTypes.includes(type)) {
    notFound();
  }

  // If no testId, show selection page for all types
  if (!searchParams.testId) {
    let tests: any[] = [];
    if (type === "READING") tests = readingTests;
    if (type === "LISTENING") tests = listeningTests;
    if (type === "WRITING") tests = writingTests;
    if (type === "SPEAKING") tests = speakingTests;

    return <TestSelection type={type} tests={tests} />;
  }

  const data = getMockExam(type, searchParams.testId);

  if (type === "READING") return <ReadingTest data={data} />;
  if (type === "LISTENING") return <ListeningTest data={data} />;
  if (type === "WRITING") return <WritingTest data={data} />;
  if (type === "SPEAKING") return <SpeakingTest data={data} />;

  return notFound();
}
