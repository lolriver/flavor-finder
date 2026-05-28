import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  darkMode: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  darkMode
}) => {
  return (
    <div className={`max-w-md mx-auto p-6 rounded-2xl shadow-xl text-center ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
      <h3 className={`text-lg font-semibold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Oops! Something went wrong
      </h3>
      <p className={`text-sm mb-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};