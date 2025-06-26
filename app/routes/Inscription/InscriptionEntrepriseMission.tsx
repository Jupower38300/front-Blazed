import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormDataType {
  domains: string[];
  name: string;
  deadline: Date;
  description: string;
  workLevel: string;
  budget: number;
  locations: string[];
  workType: string;
  workMethod: string;
  hardSkills: string[];
  stacks: string[];
  langs: string[];
  speak: string[];
  softSkills: string[];
}

const domainsOptions = [
  'Innovation',
  'Transparence',
  'Audace',
  'Passion',
  'Ethique',
  'Authenticité',
  'Performance',
  'Inclusion',
  'Créativité',
  "Esprit d'équipe",
  'Confiance',
  'Excellence',
];

const workLevelOptions = ['Junior', 'Intermédiaire', 'Sénior'];
const workTypeOptions = ['Sur site', 'A distance', 'Un mix des 2'];
const workMethodOptions = ['En équipe', 'En Solo', 'Un mix des 2'];

const InscriptionEntreprise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    domains: [],
    name: '',
    deadline: new Date(),
    description: '',
    workLevel: '',
    budget: 0,
    locations: [],
    workType: '',
    workMethod: '',
    hardSkills: [],
    stacks: [],
    langs: [],
    speak: [],
    softSkills: [],
  });

  const [errors, setErrors] = useState({
    domains: false,
    name: false,
    description: false,
    workLevel: false,
    budget: false,
    workType: false,
    workMethod: false,
    locations: false, // Ajouté
  });

  const validateStep = (): boolean => {
    const newErrors = { ...errors };

    switch (currentStep) {
      case 0:
        newErrors.domains = formData.domains.length === 0;
        break;
      case 1:
        newErrors.name = !formData.name.trim();
        break;
      case 2:
        newErrors.description = !formData.description.trim();
        break;
      case 3:
        newErrors.workLevel = !formData.workLevel;
        break;
      case 4:
        newErrors.budget = formData.budget <= 0;
        break;
      case 5:
        newErrors.locations = formData.locations.length === 0; // Ajouté
        break;
      case 6:
        newErrors.workType = !formData.workType;
        break;
      case 7:
        newErrors.workMethod = !formData.workMethod;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validateStep() && currentStep < 13) {
      // Modifié de 11 à 12
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    else window.history.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Récupérer l'UUID de l'industrie depuis l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const industryId = urlParams.get('industryId');

      // Préparer les données avec conversion de date
      const missionData = {
        ...formData,
        industryId,
        time_posted: new Date().toISOString(),
        status: 'En Cours',
        deadline: formData.deadline.toISOString(),
      };

      const res = await fetch(
        'https://blazed-back.onrender.com/mission/create/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(missionData),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert('Erreur création de mission : ' + error.message);
        return;
      }

      const data = await res.json();
      window.location.href = `/cards/?industryId=${industryId}`;
    } catch (error) {
      console.error('Erreur création mission:', error);
      alert('Une erreur est survenue lors de la création de la mission');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Domaines
        return (
          <div className="flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-6 text-[#22002A]">
              Le Domaine
            </h2>
            <p className="text-[#22002A] mb-4">
              Ce que vous défendez, c'est ce que vous attirez. Balancez les
              vibes de votre team.
            </p>
            <div className="flex w-full flex-wrap">
              {domainsOptions.map((valeur) => (
                <button
                  key={valeur}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      domains: prev.domains.includes(valeur)
                        ? prev.domains.filter((v) => v !== valeur)
                        : [...prev.domains, valeur],
                    }));
                    setErrors((prev) => ({ ...prev, domains: false }));
                  }}
                  className={`px-4 py-2 rounded-full font-medium m-1 border-2 ${
                    formData.domains.includes(valeur)
                      ? 'bg-[#22002A] text-white border-[#22002A]'
                      : 'bg-white text-[#22002A] border-[#22002A]'
                  }`}
                >
                  {valeur}
                </button>
              ))}
            </div>
            {errors.domains && (
              <p className="text-red-500 text-sm">
                Veuillez sélectionner au moins un domaine
              </p>
            )}
          </div>
        );

      case 1: // Nom de l'entreprise
        return (
          <div className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <label className="text-4xl font-bold mb-4 text-[#22002A]">
              Le nom de mon entreprise
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
                setErrors((prev) => ({ ...prev, name: false }));
              }}
              className={`block w-full p-3 rounded-lg border-2 ${
                errors.name ? 'border-red-500' : 'border-[#22002A]'
              } text-[#22002A] bg-white`}
              placeholder="Entrez le nom"
            />
            {errors.name && <p className="text-red-500 text-sm">Nom requis</p>}
            <p className="text-[#22002A] mt-4">
              C'est ici que le nom de votre entreprise va apparaître.
            </p>
            <label className="text-4xl font-bold mt-6 mb-4 text-[#22002A]">
              Date limite
            </label>
            <input
              type="date"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: new Date(e.target.value),
                }))
              }
              className="block w-full p-3 rounded-lg border-2 text-[#22002A] bg-white border-[#22002A]"
            />
          </div>
        );

      case 2: // Description
        return (
          <div className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-4 text-[#22002A]">
              Description
            </h2>
            <p className="text-[#22002A] mb-8">
              Décrivez votre entreprise et vos besoins.
            </p>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, description: false }));
              }}
              className={`w-full p-3 rounded-lg border-2 min-h-[150px] ${
                errors.description ? 'border-red-500' : 'border-[#22002A]'
              } text-[#22002A]`}
              placeholder="Entrez la description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description requise</p>
            )}
          </div>
        );

      case 3: // Niveau
        return (
          <div className="flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-6 text-[#22002A]">
              Niveau requis
            </h2>
            <p className="text-[#22002A] mb-4">
              Quel niveau d'expertise recherchez-vous ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {workLevelOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, workLevel: option }));
                    setErrors((prev) => ({ ...prev, workLevel: false }));
                  }}
                  className={`px-4 py-2 rounded-full font-medium border-2 ${
                    formData.workLevel === option
                      ? 'bg-[#22002A] text-white border-[#22002A]'
                      : 'bg-white text-[#22002A] border-[#22002A]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.workLevel && (
              <p className="text-red-500 text-sm mt-4">Option requise</p>
            )}
          </div>
        );

      case 4: // Budget
        return (
          <div className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Budget</h2>
            <p className="text-[#22002A] mb-8">
              Quel est votre budget pour ce projet ?
            </p>
            <input
              type="number"
              min="0"
              step="1"
              value={formData.budget}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  budget: Number(e.target.value),
                }));
                setErrors((prev) => ({ ...prev, budget: false }));
              }}
              className={`w-full p-3 rounded-lg border-2 ${
                errors.budget ? 'border-red-500' : 'border-[#22002A]'
              } text-[#22002A]`}
              placeholder="Montant en €"
            />
            {errors.budget && (
              <p className="text-red-500 text-sm">Budget invalide</p>
            )}
          </div>
        );

      case 5: // Localisations
        return renderSkillStep(
          'Localisations',
          'Où se situe votre entreprise ?',
          [
            'Paris',
            'Nantes',
            'Lyon',
            'Lille',
            'Marseille',
            'Toulouse',
            'Nice',
            'Bordeaux',
            'Strasbourg',
            'Montpellier',
            'Saint-Etienne',
            'Grenoble',
            'Partout en France',
          ],
          formData.locations,
          (skills) => {
            setFormData((prev) => ({ ...prev, locations: skills }));
            setErrors((prev) => ({ ...prev, locations: false }));
          },
          errors.locations // Ajouté
        );

      case 6: // Type de travail
        return (
          <div className="flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-6 text-[#22002A]">
              Type de travail
            </h2>
            <p className="text-[#22002A] mb-4">
              Quel mode de travail préférez-vous ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {workTypeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, workType: option }));
                    setErrors((prev) => ({ ...prev, workType: false }));
                  }}
                  className={`px-4 py-2 rounded-full font-medium border-2 ${
                    formData.workType === option
                      ? 'bg-[#22002A] text-white border-[#22002A]'
                      : 'bg-white text-[#22002A] border-[#22002A]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.workType && (
              <p className="text-red-500 text-sm mt-4">Option requise</p>
            )}
          </div>
        );

      case 7: // Méthode de travail
        return (
          <div className="flex flex-col justify-start pb-16 w-full max-w-xs text-left">
            <h2 className="text-4xl font-bold mb-6 text-[#22002A]">
              Méthode de travail
            </h2>
            <p className="text-[#22002A] mb-4">
              Comment préférez-vous organiser le travail ?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {workMethodOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, workMethod: option }));
                    setErrors((prev) => ({ ...prev, workMethod: false }));
                  }}
                  className={`px-4 py-2 rounded-full font-medium border-2 ${
                    formData.workMethod === option
                      ? 'bg-[#22002A] text-white border-[#22002A]'
                      : 'bg-white text-[#22002A] border-[#22002A]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.workMethod && (
              <p className="text-red-500 text-sm mt-4">Option requise</p>
            )}
          </div>
        );

      case 8: // Hard Skills
        return renderSkillStep(
          'Mes Hard Skills',
          'Compétences techniques requises',
          [
            'Marketing',
            'Illustration',
            'Graphisme',
            'Infographie',
            'Animation 3D',
            'Motion Design',
            'Montage Video',
            'WebDesign',
            'Communication',
            'UX/UI Design',
            'Développement Front End',
            'Développement Back End',
          ],
          formData.hardSkills,
          (skills) => setFormData((prev) => ({ ...prev, hardSkills: skills }))
        );

      case 9: // Logiciels
        return renderSkillStep(
          'Logiciels',
          'Outils et logiciels requis',
          [
            'VS Code',
            'GitHub',
            'Figma',
            'Canva',
            'Illustrator',
            'InDesign',
            'Photoshop',
            'WordPress',
            'Procreate',
            'After Effects',
            'Premiere Pro',
            'Cinema 4D',
          ],
          formData.stacks,
          (stacks) => setFormData((prev) => ({ ...prev, stacks }))
        );

      case 10: // Langages
        return renderSkillStep(
          'Langages',
          'Langages de programmation requis',
          [
            'HTML/CSS',
            'Java',
            'Javascript',
            'TypeScript',
            'React',
            'PHP',
            'Symfony',
            'Laravel',
            'Python',
            'C / C++',
            'Swift',
            'SQL',
            'Kotlin',
            'Go',
          ],
          formData.langs,
          (langs) => setFormData((prev) => ({ ...prev, langs }))
        );

      case 11: // Soft Skills
        return renderSkillStep(
          'Mes Soft Skills',
          'Compétences comportementales recherchées',
          [
            'Créativité',
            'Adaptabilité',
            'Autonomie',
            'Communication',
            "Esprit d'équipe",
            'Organisation',
            'Curiosité',
            'Rigueur',
            'Empathie',
            'Polyvalence',
            'Leadership',
            'Sens du travail',
          ],
          formData.softSkills,
          (skills) => setFormData((prev) => ({ ...prev, softSkills: skills }))
        );

      case 12: // Langues
        return renderSkillStep(
          'Langues parlées',
          'Langues nécessaires pour le projet',
          [
            'Français',
            'Anglais',
            'Espagnol',
            'Italien',
            'Allemand',
            'Russe',
            'Mandarin',
            'Coréen',
          ],
          formData.speak,
          (speak) => setFormData((prev) => ({ ...prev, speak }))
        );

      case 13:
        return (
          <div
            key="features"
            className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
          >
            <h2 className="text-4xl font-bold mb-4 text-[#22002A]">
              Fonctionnalités
            </h2>
            <p className="text-[#22002A] mb-8">
              L’offre parfaite pour tester la vibe BLAZED en douceur.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Quota de 5 missions par mois',
                'accessibles sans engagement',
                'Accès à la plateforme et aux missions classiques',
                'Commission de 12% sur chaque mission réalisée',
                'Gestion des missions et paiements via la plateforme',
                'Support client standard pour toute assistance',
                'Mise en avant standard du profil',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-[#22002A]"
                >
                  <span className="mt-1 text-[#E8E0EC]">•</span>
                  <span className={index === 1 ? 'ml-4' : ''}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSkillStep = (
    title: string,
    description: string,
    options: string[],
    selected: string[],
    onChange: (skills: string[]) => void,
    error?: boolean // Ajouté
  ) => (
    <div className="flex flex-col justify-start pb-16 w-full max-w-xs text-left">
      <h2 className="text-4xl font-bold mb-6 text-[#22002A]">{title}</h2>
      <p className="text-[#22002A] mb-4">{description}</p>
      <div className="flex w-full flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              const newSkills = selected.includes(option)
                ? selected.filter((s) => s !== option)
                : [...selected, option];
              onChange(newSkills);
            }}
            className={`px-4 py-2 rounded-full font-medium m-1 border-2 ${
              selected.includes(option)
                ? 'bg-[#22002A] text-white border-[#22002A]'
                : 'bg-white text-[#22002A] border-[#22002A]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {error && ( // Ajouté
        <p className="text-red-500 text-sm mt-2">
          Veuillez sélectionner au moins une option
        </p>
      )}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[url('/background.png')] bg-cover bg-center flex flex-col items-center px-6 py-10">
      <div className="w-full flex justify-between items-center mb-12">
        <button
          type="button"
          onClick={handlePrev}
          className="text-[#22002A] bg-white/20 p-2 rounded-full hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full flex justify-center">{renderStep()}</div>

      <div className="w-full max-w-xs mt-auto">
        <button
          type="button"
          onClick={currentStep === 13 ? handleSubmit : handleNext}
          className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
        >
          {currentStep === 13 ? 'Valider' : 'Continuer'}
        </button>
      </div>
    </div>
  );
};

export default InscriptionEntreprise;
