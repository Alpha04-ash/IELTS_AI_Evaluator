"use client";

import { useState, useEffect } from "react";
import { getMockExam } from "@/lib/scraper/ielts";
import ListeningTest from "./listening-test";
import ReadingTest from "./reading-test";
import WritingTest from "./writing-test";
import SpeakingTest from "./speaking-test";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer, ArrowRight } from "lucide-react";

export default function FullMockTest() {
  const [currentModule, setCurrentModule] = useState<"LISTENING" | "READING" | "WRITING" | "SPEAKING" | "RESULT">("LISTENING");
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});

  const exams = {
    LISTENING: getMockExam("LISTENING"),
    READING: getMockExam("READING"),
    WRITING: getMockExam("WRITING"),
    SPEAKING: getMockExam("SPEAKING"),
  };

  useEffect(() => {
    if (isExamStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isExamStarted) {
      handleModuleComplete();
    }
  }, [isExamStarted, timeLeft]);

  const startExam = () => {
    setIsExamStarted(true);
    setCurrentModule("LISTENING");
    setTimeLeft(exams.LISTENING.duration * 60);
  };

  const handleModuleComplete = (moduleScore?: number) => {
    if (moduleScore !== undefined) {
      setScores({ ...scores, [currentModule]: moduleScore });
    }

    if (currentModule === "LISTENING") {
      setCurrentModule("READING");
      setTimeLeft(exams.READING.duration * 60);
    } else if (currentModule === "READING") {
      setCurrentModule("WRITING");
      setTimeLeft(exams.WRITING.duration * 60);
    } else if (currentModule === "WRITING") {
      setCurrentModule("SPEAKING");
      setTimeLeft(exams.SPEAKING.duration * 60);
    } else if (currentModule === "SPEAKING") {
      setCurrentModule("RESULT");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isExamStarted) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="p-12 text-center max-w-2xl border-none shadow-2xl bg-white rounded-3xl">
          <h1 className="text-4xl font-bold mb-6 text-slate-900">IELTS Full Mock Test</h1>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed">
            This test covers all 4 modules (Listening, Reading, Writing, Speaking). 
            The total duration is approximately 2 hours and 45 minutes. 
            Once started, the timer will not stop.
          </p>
          <Button onClick={startExam} size="lg" className="bg-slate-900 px-12 py-8 text-xl rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
            Start Full Exam <ArrowRight className="ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  if (currentModule === "RESULT") {
    const overall = (Object.values(scores).reduce((a, b) => a + b, 0) / 4).toFixed(1);
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <h1 className="text-5xl font-bold mb-12">Your Overall Result</h1>
        <div className="inline-block bg-slate-900 text-white rounded-full w-48 h-48 flex items-center justify-center text-6xl font-black shadow-2xl mb-12">
          {overall}
        </div>
        <div className="grid grid-cols-2 gap-6 mb-12">
          {Object.entries(scores).map(([mod, score]) => (
            <Card key={mod} className="p-6 bg-slate-50 border-none">
              <h3 className="text-slate-500 font-medium mb-2">{mod}</h3>
              <p className="text-3xl font-bold text-slate-900">{score}</p>
            </Card>
          ))}
        </div>
        <Button onClick={() => window.location.reload()} className="bg-slate-200 text-slate-900 hover:bg-slate-300 rounded-xl px-12">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="fixed top-20 right-8 z-50">
        <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl font-mono text-xl">
          <Timer className="w-6 h-6" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="pt-24">
        {currentModule === "LISTENING" && <ListeningTest data={exams.LISTENING} onComplete={handleModuleComplete} />}
        {currentModule === "READING" && <ReadingTest data={exams.READING} onComplete={handleModuleComplete} />}
        {currentModule === "WRITING" && <WritingTest data={exams.WRITING} onComplete={handleModuleComplete} />}
        {currentModule === "SPEAKING" && <SpeakingTest data={exams.SPEAKING} onComplete={handleModuleComplete} />}
      </div>
    </div>
  );
}
