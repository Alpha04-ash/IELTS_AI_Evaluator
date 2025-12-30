import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-slate-900 selection:text-white">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-500">AI-Powered IELTS Preparation</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Master IELTS with <span className="text-slate-400">AI Examiner.</span>
        </h1>
        
        <p className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          Get real-time feedback, band scores, and personalized insights from Gemini AI. 
          Practice with real exams scraped from the web.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
          <Link href="/register">
            <Button size="lg" className="bg-slate-900 text-white rounded-full px-10 py-7 text-lg hover:bg-slate-800 shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1">
              Get Started for Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="lg" className="rounded-full px-10 py-7 text-lg hover:bg-slate-50">
              Sign In
            </Button>
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "AI Speaking Examiner", desc: "Voice-to-text integration with Gemini for real-time conversation feedback." },
            { title: "Writing Analysis", desc: "Detailed breakdown of your essays based on official IELTS criteria." },
            { title: "Real Mock Tests", desc: "Up-to-date exam content scraped directly from official sources." }
          ].map((f, i) => (
            <div key={i} className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-400">© 2025 IELTS AI. Built for excellence.</p>
      </footer>
    </div>
  );
}
