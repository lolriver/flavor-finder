import React from 'react';

interface BackgroundOverlayProps {
  darkMode: boolean;
}

export const BackgroundOverlay: React.FC<BackgroundOverlayProps> = ({ darkMode }) => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Food Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-purple-900/95'
          : 'bg-gradient-to-br from-white/90 via-orange-50/85 to-red-50/90'
      }`} />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              darkMode ? 'bg-orange-400/20' : 'bg-orange-300/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating Food Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>🍅</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>🥕</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>🧄</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s' }}>🌿</div>
        <div className="absolute top-60 left-1/2 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>🍖</div>
      </div>
    </div>
  );
};