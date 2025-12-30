"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface ReadingTestProps {
  data: any;
  onComplete?: (score: number) => void;
}

export default function ReadingTest({ data, onComplete }: ReadingTestProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentPassage, setCurrentPassage] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    data.sections.forEach((section: any) => {
      section.questions.forEach((q: any) => {
        total++;
        if (answers[q.id]?.trim().toUpperCase() === q.answer.toUpperCase()) {
          correct++;
        }
      });
    });

    // Simple IELTS band conversion for reading (approximate)
    const band = (correct / total) * 9;
    return Number(band.toFixed(1));
  };

  const handleFinish = () => {
    if (onComplete) onComplete(calculateScore());
  };

  const passage = data.sections[currentPassage];

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-slate-50">
      {/* Sidebar Navigation */}
      <div className="w-16 bg-white border-r border-slate-100 flex flex-col items-center py-8 gap-4">
        {data.sections.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setCurrentPassage(i)}
            className={`w-10 h-10 rounded-xl font-bold transition-all ${
              currentPassage === i ? "bg-slate-900 text-white shadow-lg scale-110" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Passage Content */}
      <div className="flex-1 p-12 overflow-y-auto bg-white shadow-inner">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6 text-blue-600 font-bold uppercase tracking-widest text-sm">
            <BookOpen className="w-4 h-4" />
            Reading Passage {currentPassage + 1}
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-8">{passage.title}</h2>
          <div className="prose prose-slate max-w-none prose-lg">
            <p className="whitespace-pre-wrap leading-relaxed text-slate-700 font-serif">
              {passage.passage}
            </p>
          </div>
        </div>
      </div>

      {/* Questions Side */}
      <div className="w-[450px] p-8 overflow-y-auto bg-slate-50 border-l border-slate-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Questions</h2>
          <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-400 border border-slate-100">
            {Object.keys(answers).length} / {data.sections.reduce((acc: number, s: any) => acc + s.questions.length, 0)} answered
          </span>
        </div>

        <div className="space-y-6">
          {passage.questions.map((q: any) => (
            <Card key={q.id} className="p-6 border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-all group">
              <p className="mb-4 font-bold text-slate-800 leading-tight">
                {q.id}. {q.question}
              </p>
              <Input
                placeholder="Type answer..."
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                className="bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl font-medium"
              />
            </Card>
          ))}
        </div>

        {currentPassage === data.sections.length - 1 ? (
          <Button 
            onClick={handleFinish}
            className="w-full mt-12 bg-blue-600 hover:bg-blue-700 text-white py-8 text-lg font-black rounded-2xl shadow-xl shadow-blue-100 transition-all hover:-translate-y-1"
          >
            <CheckCircle2 className="mr-2" /> Finish Reading
          </Button>
        ) : (
          <Button 
            onClick={() => setCurrentPassage(currentPassage + 1)}
            className="w-full mt-12 bg-slate-900 hover:bg-slate-800 text-white py-8 text-lg font-black rounded-2xl shadow-xl shadow-slate-200 transition-all"
          >
            Next Passage
          </Button>
        )}
      </div>
    </div>
  );
}
