
import React, { useEffect, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import Lottie from 'lottie-react';

interface RiveProps {
  src: string;
  stateMachines?: string;
  className?: string;
  autoplay?: boolean;
}

export const RiveAnimation: React.FC<RiveProps> = ({ 
  src, 
  stateMachines, 
  className = "w-full h-full",
  autoplay = true 
}) => {
  const { RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className={className}>
      <RiveComponent />
    </div>
  );
};

interface LottieProps {
  animationData?: any;
  path?: string; // Support for URL
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export const LottieAnimation: React.FC<LottieProps> = ({ 
  animationData, 
  path,
  className = "w-full h-full",
  loop = true,
  autoplay = true
}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (path) {
      fetch(path)
        .then(res => {
          if (!res.ok) throw new Error("Failed to load Lottie");
          return res.json();
        })
        .then(json => setData(json))
        .catch(err => {
          console.error("Error loading Lottie:", err);
          setError(true);
        });
    }
  }, [path]);

  const finalData = animationData || data;

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center border border-white/10 rounded-full`}>
        <div className="w-4 h-4 bg-brand-accent rounded-full animate-pulse" />
      </div>
    );
  }

  if (!finalData) return <div className={className} />;

  return (
    <Lottie 
      animationData={finalData} 
      className={className}
      loop={loop}
      autoplay={autoplay}
      style={{ width: '100%', height: '100%' }}
    />
  );
};
