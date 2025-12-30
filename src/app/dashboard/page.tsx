import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Headphones, PenTool, Mic, GraduationCap, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const tests = [
    { title: "Reading", type: "reading", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Listening", type: "listening", icon: Headphones, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Writing", type: "writing", icon: PenTool, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Speaking", type: "speaking", icon: Mic, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 pt-24 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Hello, <span className="text-slate-400 font-medium">Ready to excel?</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium">Track your progress and master every IELTS module.</p>
        </div>
        
        <Link href="/mock-test">
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-8 text-xl font-black rounded-[2rem] shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1 group">
            <GraduationCap className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
            Get a Full Mock Test
            <Sparkles className="ml-3 w-5 h-5 text-yellow-400" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {tests.map((test) => (
          <Card key={test.type} className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] bg-white group overflow-hidden">
            <div className={`h-2 w-full ${test.bg.replace('bg-', 'bg-opacity-50 bg-')}`} />
            <CardHeader className="pt-8 px-8">
              <div className={`w-16 h-16 ${test.bg} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <test.icon className={`w-8 h-8 ${test.color}`} />
              </div>
              <CardTitle className="text-2xl font-black text-slate-900">{test.title}</CardTitle>
              <CardDescription className="text-slate-400 font-medium">Practice your skills</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Link href={`/test/${test.type}`}>
                <Button variant="outline" className="w-full border-2 border-slate-100 hover:border-slate-900 hover:bg-slate-900 hover:text-white rounded-2xl py-6 font-bold transition-all">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
