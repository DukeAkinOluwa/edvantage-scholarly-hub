
import { useEffect, useState } from "react";

const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-display font-bold text-edvantage-blue">Edvantage</h2>
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-edvantage-blue transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
