import React, { useState } from 'react';
import { Share2, Check, Copy, Mail, MessageCircle } from 'lucide-react';

interface ShareRecipeProps {
  recipeTitle: string;
  recipeId: number;
  darkMode: boolean;
}

export const ShareRecipe: React.FC<ShareRecipeProps> = ({
  recipeTitle,
  recipeId,
  darkMode
}) => {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const shareUrl = `${window.location.origin}?recipe=${recipeId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(recipeTitle)}&body=${encodeURIComponent(`Check out this recipe: ${shareUrl}`)}`;
  };

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this recipe: ${recipeTitle} ${shareUrl}`)}`, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-200 active:scale-90 ${
          darkMode
            ? 'bg-gray-700/80 text-gray-300 hover:bg-gray-600'
            : 'bg-white/80 text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Share2 size={18} className="sm:w-5 sm:h-5" />
      </button>

      {showOptions && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          <div className={`absolute top-full right-0 mt-2 rounded-xl shadow-2xl border z-50 min-w-[200px] ${
            darkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}>
            <div className="p-2">
              <button
                onClick={handleCopyLink}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} className="text-green-500" />
                    <span className="text-sm font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="text-sm font-medium">Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareEmail}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Mail size={18} />
                <span className="text-sm font-medium">Share via Email</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
