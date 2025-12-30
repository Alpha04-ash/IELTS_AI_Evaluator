"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import IELTSChart from "./ielts-chart";

interface WritingTestProps {
  data: any;
  onComplete?: (score: number) => void;
}

export default function WritingTest({ data, onComplete }: WritingTestProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<Record<number, any>>({});
  const { toast } = useToast();

  const handleTaskSubmit = async (taskIndex: number) => {
    const submission = answers[taskIndex] || "";
    const minWords = data.sections[taskIndex].minWords;

    if (submission.split(/\s+/).filter(Boolean).length < minWords / 2) {
      toast({
        title: "Too short",
        description: `Please write more for Task ${taskIndex + 1}. Minimum is ${minWords} words.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ai/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "WRITING",
          taskData: data.sections[taskIndex].prompt,
          userInput: submission,
        }),
      });
      const dataJson = await response.json();
      setResults({ ...results, [taskIndex]: dataJson });
      
      toast({
        title: `Task ${taskIndex + 1} Graded`,
        description: `Band Score: ${dataJson.score}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to grade task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = () => {
    if (Object.keys(results).length < data.sections.length) {
      toast({
        title: "Incomplete",
        description: "Please submit both tasks for AI grading first.",
        variant: "destructive",
      });
      return;
    }

    const averageScore = Object.values(results).reduce((a, b) => a + b.score, 0) / data.sections.length;
    if (onComplete) onComplete(Number(averageScore.toFixed(1)));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-4 bg-orange-100 rounded-3xl">
          <PenTool className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900">{data.title}</h1>
          <p className="text-slate-500 font-medium">Task 1 and Task 2</p>
        </div>
      </div>

      <div className="space-y-12">
        {data.sections.map((section: any, idx: number) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card className="p-8 bg-white border-none shadow-xl rounded-3xl">
                <div className="flex items-center gap-2 mb-4 text-orange-600 font-bold uppercase tracking-widest text-sm">
                  <Info className="w-4 h-4" />
                  Writing {section.taskType.replace("_", " ")}
                </div>
                <p className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-wrap mb-6">
                  {section.prompt}
                </p>
                {section.chartData && (
                  <div className="mb-6">
                    <IELTSChart data={section.chartData} />
                  </div>
                )}
                {section.imageUrl && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
                    <img 
                      src={section.imageUrl} 
                      alt="Writing Task Chart" 
                      className="w-full h-auto object-contain max-h-[400px]"
                    />
                  </div>
                )}
                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4 text-sm text-slate-400">
                  <span>Target: {section.minWords} words</span>
                  <span>Time: {idx === 0 ? "20" : "40"} minutes</span>
                </div>
              </Card>

              {results[idx] && (
                <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl rounded-3xl animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Task {idx + 1} Result</h3>
                    <div className="bg-orange-500 px-4 py-1 rounded-full text-sm font-black">
                      Band {results[idx].score}
                    </div>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none opacity-80" 
                       dangerouslySetInnerHTML={{ __html: results[idx].feedback.replace(/\n/g, '<br/>') }} />
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Textarea
                placeholder={`Type your response for Task ${idx + 1} here...`}
                className="min-h-[450px] p-8 text-lg bg-white border-none shadow-xl rounded-3xl focus-visible:ring-2 focus-visible:ring-orange-500 transition-all"
                value={answers[idx] || ""}
                onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
              />
              <div className="flex justify-between items-center px-4">
                <span className="text-slate-400 font-medium">
                  Word count: {(answers[idx] || "").split(/\s+/).filter(Boolean).length}
                </span>
                <Button 
                  onClick={() => handleTaskSubmit(idx)}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 py-6"
                  disabled={isSubmitting || !!results[idx]}
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : `Submit Task ${idx + 1}`}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center pb-20">
        <Button 
          onClick={handleFinalSubmit}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-8 text-xl font-black rounded-3xl shadow-2xl shadow-orange-200 transition-all hover:-translate-y-1"
        >
          Finish Writing Module
        </Button>
      </div>
    </div>
  );
}
