"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SpeakingTestProps {
  data: any;
  onComplete?: (score: number) => void;
}

export default function SpeakingTest({ data, onComplete }: SpeakingTestProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };
      }
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleNext = () => {
    const newResponses = [...responses, transcript];
    setResponses(newResponses);
    setTranscript("");

    const currentPart = data.sections[currentPartIndex];
    if (currentPart.questions && currentQuestionIndex < currentPart.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentPartIndex < data.sections.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleSubmit(newResponses);
    }
  };

  const handleSubmit = async (finalResponses: string[]) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ai/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "SPEAKING",
          taskData: "IELTS Full Speaking Test Parts 1, 2 and 3",
          userInput: finalResponses.join(" | "),
        }),
      });
      const dataJson = await response.json();
      setResult(dataJson);
    } catch (error) {
      toast({ title: "Error", description: "Grading failed.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentPart = data.sections[currentPartIndex];
  const question = currentPart.questions ? currentPart.questions[currentQuestionIndex] : currentPart.prompt;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-6 mb-12">
        <div className="p-5 bg-green-100 rounded-3xl shadow-lg">
          <Mic className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{data.title}</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            {currentPart.part?.replace("_", " ")}
          </p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-8">
          <Card className="p-16 border-none bg-white shadow-2xl rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500 opacity-20"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full mb-8 text-slate-400 text-sm font-bold uppercase tracking-widest">
              <Info className="w-4 h-4" />
              Examiner is asking...
            </div>
            
            <h2 className="text-3xl font-bold mb-12 text-slate-800 leading-snug max-w-2xl mx-auto">
              {question}
            </h2>
            
            <div className="flex flex-col items-center gap-8">
              <button
                onClick={toggleRecording}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isRecording 
                  ? "bg-red-500 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.4)]" 
                  : "bg-slate-900 hover:bg-slate-800 shadow-2xl"
                }`}
              >
                {isRecording ? <MicOff className="text-white w-12 h-12" /> : <Mic className="text-white w-12 h-12" />}
              </button>
              <p className={`text-lg font-bold transition-colors ${isRecording ? "text-red-500" : "text-slate-400"}`}>
                {isRecording ? "RECORDING YOUR VOICE..." : "CLICK TO ANSWER"}
              </p>
            </div>
          </Card>

          {transcript && (
            <Card className="p-8 border-none shadow-xl bg-white/50 backdrop-blur-sm rounded-3xl border border-white">
              <p className="text-slate-500 italic text-lg leading-relaxed">"{transcript}"</p>
            </Card>
          )}

          <div className="flex justify-between items-center pt-8">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-2 w-8 rounded-full ${currentPartIndex === i ? "bg-green-500" : "bg-slate-200"}`} />
              ))}
            </div>
            <Button 
              onClick={handleNext}
              disabled={!transcript && !isRecording}
              className="bg-slate-900 hover:bg-slate-800 text-white px-12 py-7 text-lg font-black rounded-2xl shadow-xl transition-all"
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <Card className="p-12 border-none bg-white shadow-2xl rounded-[3rem] text-center">
           <h2 className="text-4xl font-black text-slate-900 mb-8">Speaking Feedback</h2>
           <div className="inline-block bg-slate-900 text-white px-10 py-4 rounded-3xl text-3xl font-black mb-8">
              Band Score: {result.score}
           </div>
           <div className="prose prose-slate max-w-none text-left bg-slate-50 p-8 rounded-3xl mb-8" 
                dangerouslySetInnerHTML={{ __html: result.feedback.replace(/\n/g, '<br/>') }} />
           <Button onClick={() => onComplete && onComplete(result.score)} className="bg-green-600 hover:bg-green-700 text-white px-12 py-6 rounded-2xl text-xl font-bold">
              Finish Module
           </Button>
        </Card>
      )}

      {isSubmitting && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-50">
          <Loader2 className="w-16 h-16 text-slate-900 animate-spin mb-6" />
          <p className="text-2xl font-black text-slate-900 uppercase tracking-widest">AI is analyzing your fluency...</p>
        </div>
      )}
    </div>
  );
}
