import React, { useEffect, useState } from 'react';
import Footer from '~/components/Footer';
import { useParams } from 'react-router-dom';

// Interface mise à jour pour correspondre à votre entité backend
interface UserProfile {
  userId: string; // ou number selon votre implémentation backend
  first_name: string;
  last_name: string;
  profile_title: string;
  phone: string;
  email: string;
  website?: string;
  domaines: string[]; // Assurez-vous que ce champ existe dans votre entité
  dailyRate: number; // Notez le underscore
}

export default function ProfileMobilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError('Aucun ID utilisateur spécifié');
          setLoading(false);
          return;
        }

        // Appel direct sans headers d'authentification
        const response = await fetch(`http://localhost:3000/profile/${userId}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 via-white to-orange-200 pb-24 text-black items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-4">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 via-white to-orange-200 pb-24 text-black items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 via-white to-orange-200 pb-24 text-black items-center justify-center">
        <p>Aucune donnée utilisateur disponible</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-100 via-white to-orange-200 pb-24 text-black">
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="text-3xl font-bold leading-tight">
          <div>{userData.first_name}</div> {/* Utilisez first_name */}
          <div>{userData.last_name}</div> {/* Utilisez last_name */}
        </div>
        <img
          src="https://via.placeholder.com/60"
          alt="Profile"
          className="rounded-full w-16 h-16 object-cover"
        />
      </div>

      {/* Contact Info */}
      <div className="mx-4 p-4 bg-white rounded-lg shadow">
        <div className="space-y-1 text-sm">
          <div>📎 {userData.profile_title}</div>
          <div>📞 {userData.phone}</div>
          <div>📧 {userData.email}</div>
          {userData.website && <div>🌐 {userData.website}</div>}
        </div>
      </div>

      {/* Portfolio & CV */}
      <div className="mt-4 mx-4 space-y-2">
        <div className="bg-white p-3 rounded-lg shadow">
          <div className="font-bold">Portfolio</div>
          <div className="text-xs text-red-500">(PDF, JPEG, JPG, PNG)</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <div className="font-bold">CV</div>
          <div className="text-xs text-red-500">(PDF, JPEG, JPG, PNG)</div>
        </div>
      </div>

      {/* Recherche */}
      <div className="mt-4 mx-4 space-y-2">
        {[
          `Le domaine: ${userData.domaines?.join(', ') || 'Non spécifié'}`,
          `Mon TJM: ${
            userData.dailyRate ? `${userData.dailyRate}€` : 'Non spécifié' // Utilisez daily_rate
          }`,
          'Méthode de travail',
          'Mon niveau',
          'Type de lieu',
          'Expériences',
          'Langues',
          'Hard skills',
          'Soft skills',
          'Logiciels',
          'Langages',
        ].map((label) => (
          <div
            key={label}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <span>{label}</span>
            <span className="text-xl">›</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 mx-4 space-y-2">
        <button className="w-full bg-purple-800 text-white py-2 rounded-lg">
          Se déconnecter
        </button>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg">
          Supprimer mon compte
        </button>
      </div>

      {/* Footer (Visuel bas) */}
      <footer className="mt-6 p-4 text-center text-xs text-gray-500">
        <div className="mt-1">Fais avec ❤️</div>
      </footer>

      {/* Footer de navigation */}
      <Footer activeTab="profil" userId={userId} />
    </div>
  );
}
