
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const FaqItem = ({ question, answer, isOpen = false }: FaqItemProps) => {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <h3 className="text-lg font-medium text-foreground">{question}</h3>
        <span className="text-edvantage-blue ml-4">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      
      <div
        className={`mt-2 text-edvantage-dark-gray transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
