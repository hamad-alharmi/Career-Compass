import { motion } from "framer-motion";
import { Briefcase, ArrowRight, GraduationCap, Building } from "lucide-react";

interface ResultItem {
  title: string;
  description: string;
  link?: string;
}

interface GuidanceCardProps {
  item: ResultItem;
  type: 'job_apps' | 'related_careers' | 'suggest_major';
  index: number;
}

export function GuidanceCard({ item, type, index }: GuidanceCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'job_apps': return <Building className="w-5 h-5 text-blue-600" />;
      case 'related_careers': return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case 'suggest_major': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getBadgeColor = () => {
    switch (type) {
      case 'job_apps': return "bg-blue-50 text-blue-700 border-blue-100";
      case 'related_careers': return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case 'suggest_major': return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'job_apps': return "Apply Now";
      case 'related_careers': return "Learn More";
      case 'suggest_major': return "View Curriculum";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-card p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${getBadgeColor()} border`}>
          {getIcon()}
        </div>
        {type === 'job_apps' && (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
            Active
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
        {item.title}
      </h3>
      
      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
        {item.description}
      </p>

      {item.link && (
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-primary transition-colors duration-200"
        >
          {getButtonText()}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </motion.div>
  );
}
