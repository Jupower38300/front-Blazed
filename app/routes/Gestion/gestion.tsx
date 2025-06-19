import { useParams } from 'react-router-dom';
import Footer from '~/components/Footer';

export default function Gestion() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6 pb-24">
      {/* Menu */}
      <div className="flex justify-center gap-4 mb-6">
        <a
          href="/gestion"
          className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium"
        >
          Missions
        </a>
        <a
          href="/paiements"
          className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium border border-black"
        >
          Paiements
        </a>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Mes missions
      </h1>

      {/* Nouveaux marchés */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4">
        <h2 className="font-bold mb-3">Nouveaux marchés</h2>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Création d'illustrations</p>
            <p className="text-sm text-gray-500">La Petite Dartherie</p>
          </div>
          <div>
            <p className="font-medium">Création PAO</p>
            <p className="text-sm text-gray-500">Non agence du print</p>
          </div>
          <div>
            <p className="font-medium">Graphiste</p>
            <p className="text-sm text-gray-500">Nationale Society</p>
          </div>
        </div>
      </div>

      {/* Missions en cours */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4">
        <h2 className="font-bold mb-3">Mesions en cours</h2>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Création logo</p>
            <p className="text-sm text-gray-500">Mes bosses miniators</p>
          </div>
          <div>
            <p className="font-medium">Identité visuelle</p>
            <p className="text-sm text-gray-500">Dis Partenaire</p>
          </div>
        </div>
      </div>

      {/* Missions terminées */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="font-bold mb-3">Mesions terminées</h2>
        <div className="space-y-3">
          <div>
            <p className="font-medium">Réalisation d'affiches</p>
            <p className="text-sm text-gray-500">Marine Commies</p>
          </div>
          <div>
            <p className="font-medium">Création d'assets</p>
            <p className="text-sm text-gray-500">Non agence du print</p>
          </div>
        </div>
      </div>

      <Footer activeTab="gestion" userId={userId!} />
    </div>
  );
}
