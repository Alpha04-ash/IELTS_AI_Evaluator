import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Headphones, PenTool, Mic, ArrowRight } from "lucide-react";

interface TestSelectionProps {
  type: "READING" | "LISTENING" | "WRITING" | "SPEAKING";
  tests: any[];
}

const config: Record<string, any> = {
  READING: {
    icon: BookOpen,
    color: "blue",
    title: "Reading",
    unit: "Passages",
    duration: "60 Minutes"
  },
  LISTENING: {
    icon: Headphones,
    color: "purple",
    title: "Listening",
    unit: "Parts",
    duration: "30 Minutes"
  },
  WRITING: {
    icon: PenTool,
    color: "orange",
    title: "Writing",
    unit: "Tasks",
    duration: "60 Minutes"
  },
  SPEAKING: {
    icon: Mic,
    color: "green",
    title: "Speaking",
    unit: "Parts",
    duration: "15 Minutes"
  }
};

export default function TestSelection({ type, tests }: TestSelectionProps) {
  const { icon: Icon, color, title, unit, duration } = config[type];
  
  const colors: Record<string, string> = {
    blue: "text-blue-500 bg-blue-50 hover:bg-blue-600",
    purple: "text-purple-500 bg-purple-50 hover:bg-purple-600",
    orange: "text-orange-500 bg-orange-50 hover:bg-orange-600",
    green: "text-green-500 bg-green-50 hover:bg-green-600"
  };

  const currentColors = colors[color].split(' ');

  return (
    <div className="max-w-5xl mx-auto p-8 pt-24 bg-slate-50 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          {title} <span className={currentColors[0]}>Practice</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium">Select a real IELTS Academic test to begin your practice session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl bg-white group overflow-hidden">
            <CardHeader className="p-8">
              <div className={`w-12 h-12 ${currentColors[1]} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${currentColors[0]}`} />
              </div>
              <CardTitle className="text-xl font-bold text-slate-900">{test.title}</CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                {test.sections.length} {unit} • {duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0">
              <Link href={`/test/${type.toLowerCase()}?testId=${test.id}`}>
                <Button className={`w-full bg-slate-900 ${currentColors[2]} text-white rounded-xl py-6 font-bold transition-colors group`}>
                  Start Test
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
