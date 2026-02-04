import { useState } from "react";
import { useGuidanceSearch } from "@/hooks/use-guidance";
import { GuidanceCard } from "@/components/GuidanceCard";
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  Loader2, 
  ChevronDown,
  Building,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

type SearchType = 'job_apps' | 'related_careers' | 'suggest_major';

export default function Home() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<SearchType>('job_apps');
  const { toast } = useToast();

  const searchMutation = useGuidanceSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a major or job title to search.",
        variant: "destructive",
      });
      return;
    }

    searchMutation.mutate(
      { query, type },
      {
        onError: (error) => {
          toast({
            title: "Search failed",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const getPlaceholder = () => {
    switch (type) {
      case 'suggest_major': return "e.g. Software Engineer, Doctor, Artist...";
      default: return "e.g. Computer Science, Psychology, Biology...";
    }
  };

  const getTypeLabel = (t: SearchType) => {
    switch (t) {
      case 'job_apps': return "Find Job Applications";
      case 'related_careers': return "Explore Related Careers";
      case 'suggest_major': return "Suggest a Major";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

      {/* Header / Nav */}
      <header className="border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              FuturePath
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Universities</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Career Guidance</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 leading-tight">
            Discover Your <span className="text-primary italic">Path</span> to Success
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Unsure about your major or career? Let our intelligent guidance system connect your interests with real-world opportunities.
          </p>

          {/* Search Card */}
          <div className="glass p-2 rounded-2xl shadow-xl shadow-blue-900/5 max-w-2xl mx-auto transform transition-all hover:scale-[1.01]">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 focus:ring-0 text-lg"
                />
              </div>

              <div className="h-px md:h-auto md:w-px bg-slate-200 mx-2" />

              <div className="relative min-w-[200px]">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as SearchType)}
                  className="w-full h-full appearance-none bg-transparent pl-4 pr-10 py-4 text-slate-700 font-medium outline-none cursor-pointer focus:text-primary transition-colors"
                >
                  <option value="job_apps">Job Applications</option>
                  <option value="related_careers">Related Careers</option>
                  <option value="suggest_major">Suggest Major</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              <button
                type="submit"
                disabled={searchMutation.isPending}
                className="bg-slate-900 hover:bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-slate-900/10 hover:shadow-primary/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {searchMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Search"
                )}
              </button>
            </form>
          </div>
          
          {/* Helper text */}
          <p className="text-xs text-slate-400 mt-4">
            Try searching for "Computer Science" or "Graphic Designer"
          </p>
        </div>

        {/* Results Section */}
        <div className="min-h-[400px]">
          {searchMutation.data && (
            <div className="space-y-8 animate-enter">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-display text-slate-900">
                  Results for <span className="text-primary">"{query}"</span>
                </h2>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {getTypeLabel(type)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {searchMutation.data.results.map((item, i) => (
                    <GuidanceCard 
                      key={i} 
                      item={item} 
                      type={type} 
                      index={i} 
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {!searchMutation.data && !searchMutation.isPending && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Find Opportunities</h3>
                <p className="text-sm text-slate-600">Search for job openings relevant to your field of study.</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Explore Careers</h3>
                <p className="text-sm text-slate-600">Discover what career paths are available for different majors.</p>
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Academic Guidance</h3>
                <p className="text-sm text-slate-600">Get major suggestions based on your dream job title.</p>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
