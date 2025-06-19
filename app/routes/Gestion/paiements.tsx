// Paiements.tsx
import { Link } from 'react-router-dom';
import Footer from '~/components/Footer';

export default function Paiements() {
  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6 pb-24">
      {/* Menu */}
      <div className="flex justify-center gap-4 mb-6">
        <Link
          to="/gestion"
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium border border-black"
        >
          Missions
        </Link>
        <Link
          to="/paiements"
          className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
        >
          Paiements
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Mes paiements
      </h1>

      {/* Paiements prochains */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">3 050 €</h2>
          <span className="text-sm text-gray-500">Paiements prochains</span>
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Création logo</p>
            <p className="text-sm text-gray-500">Mes beaux moutons</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Identité visuelle</p>
              <p className="text-sm text-gray-500">Bio Partenaires</p>
            </div>
            <span className="font-medium">800 €</span>
          </div>
        </div>
      </div>

      {/* Paiements terminés */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold">3 050 €</h2>
          <span className="text-sm text-gray-500">Paiements terminés</span>
        </div>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Réalisation d'affiches</p>
            <p className="text-sm text-gray-500">Martine Cosmetics</p>
          </div>
          <div>
            <p className="font-medium">Création d'assets</p>
            <p className="text-sm text-gray-500">Mon agence du print</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
