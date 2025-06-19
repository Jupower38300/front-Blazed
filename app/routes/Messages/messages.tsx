import { useParams } from 'react-router-dom';
import Footer from '~/components/Footer';

export default function Messages() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <div className="min-h-screen bg-[#F4F4F4] p-6 pb-24">
      {/* En-tête */}
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Messagerie
      </h1>

      {/* Liste des messages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-4">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">Messages</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Message 1 */}
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-black">Mes beaux moutons</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
              <span className="text-xs text-gray-400">20:36</span>
            </div>
          </div>

          {/* Message 2 */}
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-black">Bio Partenaires</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
              <span className="text-xs text-gray-400">Hier</span>
            </div>
          </div>

          {/* Message 3 */}
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-black">Martine Cosmetics</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
              <span className="text-xs text-gray-400">05/02/2025</span>
            </div>
          </div>

          {/* Message 4 */}
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-black">Mon agence du print</p>
                <p className="text-sm text-gray-500 mt-1">
                  Lorem ipsum dolor sit amet...
                </p>
              </div>
              <span className="text-xs text-gray-400">03/02/2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Communauté */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-4">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold">Communauté</h2>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-black">Général</span>
              <span className="text-xs text-gray-400">20:36</span>
            </div>
          </div>

          <div className="p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-black">Annonces</span>
              <span className="text-xs text-gray-400">Hier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer activeTab="messagerie" userId={userId!} />
    </div>
  );
}
