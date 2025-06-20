import { useEffect, useState } from 'react';
import logoDark from '/logo.png';

export function Welcome() {
  const [hasSeenIntro, setHasSeenIntro] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenIntro');
    if (!seen) {
      setHasSeenIntro(false);
    }
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem('hasSeenIntro', 'false');
    setVideoEnded(true);
  };

  if (!hasSeenIntro && !videoEnded) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-black overflow-hidden">
        <video
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnd}
          className="max-w-auto max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#FF9900] via-[#F43429] to-[#22002A] text-white flex flex-col justify-between items-center px-6 py-10">
      <div className="flex flex-col items-center justify-center flex-1 text-center w-full">
        <div className="w-[60%] mb-4">
          <img src={logoDark} alt="Logo" className="hidden w-full dark:block" />
        </div>
        <h1 className="text-[20px] md:text-2xl font-[300] mb-10">
          Swipe. Match. Gagne.
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          <a
            href="/inscription"
            className="bg-[#430053] text-white font-bold py-3 rounded-full"
          >
            Crée ton compte
          </a>
          <a
            href="/login"
            className="bg-white text-[#22002A] font-bold py-3 rounded-full text-center"
          >
            Se connecter
          </a>
        </div>
      </div>
    </main>
  );
}
