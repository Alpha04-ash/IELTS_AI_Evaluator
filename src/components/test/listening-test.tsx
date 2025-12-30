"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Volume2 } from "lucide-react";

interface ListeningTestProps {
  data: any;
  onComplete?: (score: number) => void;
}

export default function ListeningTest({ data, onComplete }: ListeningTestProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentSection, setCurrentSection] = useState(0);

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

    const band = (correct / total) * 9;
    return Number(band.toFixed(1));
  };

  const handleFinish = () => {
    if (onComplete) onComplete(calculateScore());
  };

  const section = data.sections[currentSection];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-6 mb-12">
        <div className="p-5 bg-purple-100 rounded-3xl shadow-lg">
          <Headphones className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{data.title}</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Section {currentSection + 1} of {data.sections.length}</p>
        </div>
      </div>

      <Card className="p-8 bg-white border-none shadow-2xl rounded-[2.5rem] mb-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 bg-purple-500 h-full"></div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
          <Volume2 className="text-purple-400 w-8 h-8 animate-pulse" />
        </div>
        
        <audio controls className="w-full h-14 rounded-2xl">
          <source src={section.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        {section.imageUrl && (
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100">
            <img 
              src={section.imageUrl} 
              alt="Listening Section Diagram" 
              className="w-full h-auto object-contain max-h-[400px]"
            />
          </div>
        )}
      </Card>

      <div className="grid gap-6">
        {section.questions.map((q: any) => (
          <div key={q.id} className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all border border-slate-100">
            <p className="font-bold text-slate-800 text-lg">
              {q.id}. {q.question}
            </p>
            <Input
              placeholder="Your answer..."
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              className="max-w-md h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-purple-500 font-medium"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-between items-center pb-20">
        <div className="flex gap-2">
          {data.sections.map((_: any, i: number) => (
            <div 
              key={i} 
              className={`h-2 w-12 rounded-full transition-all ${currentSection === i ? "bg-purple-600 w-20" : "bg-slate-200"}`}
            />
          ))}
        </div>

        {currentSection < data.sections.length - 1 ? (
          <Button 
            onClick={() => setCurrentSection(currentSection + 1)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-7 text-lg font-black rounded-2xl shadow-xl transition-all"
          >
            Next Section
          </Button>
        ) : (
          <Button 
            onClick={handleFinish}
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-7 text-lg font-black rounded-2xl shadow-xl shadow-purple-100 transition-all hover:-translate-y-1"
          >
            Finish Listening
          </Button>
        )}
      </div>
    </div>
  );
}
