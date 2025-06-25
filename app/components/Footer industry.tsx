import { useParams, Link } from 'react-router-dom';

type FooterProps = {
  activeTab?: string;
  industryId: string;
};

export default function FooterIndustry({ activeTab, industryId }: FooterProps) {
  const params = useParams<{ industryId: string }>();

  // Debug pour voir ce qui est disponible
  console.log('Footer - params:', params);
  console.log('Footer - industryId prop:', industryId);

  // Priorité : industryId passé en props > params.industryId > params.id
  const id = industryId || params.industryId || params.industryId;

  console.log('Footer - ID final:', id);

  // Si aucun ID n'est trouvé, on peut gérer le cas d'erreur
  if (!id) {
    console.warn('Aucun ID utilisateur trouvé dans le Footer');
    return null; // ou afficher un footer sans liens
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4">
      <div className="flex justify-around items-center">
        <Link
          to={`/cards/${id}`}
          className={`text-sm ${
            activeTab === 'accueil' ? 'font-bold text-black' : 'text-gray-500'
          }`}
        >
          Accueil
        </Link>
        <Link
          to={`/gestion/${id}`}
          className={`text-sm ${
            activeTab === 'gestionnaire'
              ? 'font-bold text-black'
              : 'text-gray-500'
          }`}
        >
          Gestionnaire
        </Link>
        <Link
          to={`/messagerie/${id}`}
          className={`text-sm ${
            activeTab === 'messagerie'
              ? 'font-bold text-black'
              : 'text-gray-500'
          }`}
        >
          Messagerie
        </Link>
        <Link
          to={`/profile/${id}`}
          className={`text-sm ${
            activeTab === 'profil' ? 'font-bold text-black' : 'text-gray-500'
          }`}
        >
          Mon profil
        </Link>
      </div>
    </footer>
  );
}
