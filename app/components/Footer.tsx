import { useParams, Link } from 'react-router-dom';

type FooterProps = {
  activeTab?: string;
  userId?: string;
};

export default function Footer({ activeTab, userId }: FooterProps) {
  const params = useParams();

  // Debug pour voir ce qui est disponible
  console.log('Footer - params:', params);
  console.log('Footer - userId prop:', userId);

  // Priorité : userId passé en props > params.userId > params.id
  const id = userId || params.userId || params.id;

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
