import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { RotateCcw, XCircle, Heart, Play } from 'lucide-react';
import type { PanInfo } from 'framer-motion';
import { useParams } from 'react-router-dom';
import FooterIndustry from '~/components/Footer industry';

const offers = [
  {
    id: 1,
    title: 'Communication Digitale',
    company: 'Craft Beer',
    price: '280€/jour',
    deadline: '13/04/25',
    image: '/beer.jpg',
  },
  {
    id: 2,
    title: 'Graphisme UX/UI',
    company: 'DesignPro',
    price: '300€/jour',
    deadline: '20/05/25',
    image: '/design.jpg',
  },
  {
    id: 3,
    title: 'Marketing Produit',
    company: 'StartUpBoost',
    price: '250€/jour',
    deadline: '01/06/25',
    image: '/marketing.jpg',
  },
];

export default function Home() {
  const { industryId } = useParams<{ industryId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset > 100 || velocity > 500) {
      swipe('right');
    } else if (offset < -100 || velocity < -500) {
      swipe('left');
    }
  };

  const swipe = (direction: 'left' | 'right') => {
    if (currentIndex < offers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    console.log(`Swiped ${direction}`);
  };

  const reset = () => setCurrentIndex(0);
  const skip = () => {
    if (currentIndex < offers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-pink-100 to-orange-100 pb-12 pt-6 px-4">
      {/* Barre de recherche et feu en haut */}
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black text-xl">
          🔍
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 text-xl">
          🔥
        </div>
      </div>

      {/* Carte swipeable */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: '500px' }}
      >
        <AnimatePresence>
          {offers[currentIndex] && (
            <motion.div
              key={offers[currentIndex].id}
              className="absolute w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
              drag="x"
              style={{ x, rotate }}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <img
                src={offers[currentIndex].image}
                alt="offer"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">
                  {offers[currentIndex].title}
                </h1>
                <div className="flex justify-between mb-1">
                  <span>{offers[currentIndex].company}</span>
                  <span className="font-bold">
                    {offers[currentIndex].price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm">
                    {offers[currentIndex].deadline}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-around mt-[-10em] mb-[10em]">
        <button onClick={reset} className="bg-white p-4 rounded-xl shadow">
          <RotateCcw className="text-orange-500" />
        </button>
        <button
          onClick={() => swipe('left')}
          className="bg-white p-4 rounded-xl shadow"
        >
          <XCircle className="text-red-500" />
        </button>
        <button
          onClick={() => swipe('right')}
          className="bg-white p-4 rounded-xl shadow"
        >
          <Heart className="text-green-500" />
        </button>
        <button onClick={skip} className="bg-white p-4 rounded-xl shadow">
          <Play className="text-yellow-500" />
        </button>
      </div>

      {/* Footer avec ID */}
      <FooterIndustry activeTab="accueil" industryId={industryId!} />
    </div>
  );
}
