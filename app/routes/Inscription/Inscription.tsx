export default function Inscription() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-[#FF9900] via-[#F43429] to-[#22002A] text-white flex flex-col px-6 py-10">
      {/* Bouton retour */}
      <a href="/" className="absolute top-6 left-4 z-10 text-white">
        <div className="w-8 h-8 bg-white text-[#22002A] rounded-full flex items-center justify-center">
          ←
        </div>
      </a>

      {/* Contenu principal */}
      <div className="flex flex-col justify-center items-center flex-1 text-center space-y-8">
        <h1 className="text-5xl font-bold">Choisis ton profil</h1>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="/inscription/freelance"
            className="bg-white text-[#22002A] font-bold py-3 rounded-full text-center"
          >
            Je suis Freelance
          </a>
          <a
            href="/inscription/entreprise"
            className="bg-white text-[#22002A] font-bold py-3 rounded-full text-center"
          >
            Je suis une Entreprise
          </a>
        </div>
      </div>
    </main>
  );
}
