import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

interface FormDataType {
  accountType: string;
  phone: string;
  email: string;
  prefix: string;
  password: string;
  newsletter: boolean;
  terms: boolean;
  valeurs: string[];
  name: string;
  profileImageBase64: string;
  size: string;
}

const valeursOptions = [
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

const InscriptionEntreprise: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataType>({
    accountType: 'industry',
    phone: '',
    email: '',
    prefix: '+33',
    password: '',
    newsletter: false,
    terms: false,
    valeurs: [],
    name: '',
    size: '',
    profileImageBase64: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({
    phone: false,
    email: false,
    password: false,
    name: false,
    size: false,
    profileImageBase64: false,
    valeurs: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { industryId: _industryId } = useParams<{ industryId: string }>();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (prefix: string, phone: string) => {
    const digits = phone.replace(/[^0-9]/g, '');
    const fullNumber = `${prefix}${digits}`;
    const re = /^\+\d{6,15}$/;
    return re.test(fullNumber);
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject('Erreur de lecture fichier');
      };
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        setFormData((prev) => ({ ...prev, profileImageBase64: base64 }));
        setErrors((prev) => ({ ...prev, profileImageBase64: false }));
      } catch (error) {
        console.error('Erreur conversion image', error);
      }
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, boolean> = { ...errors };

    switch (currentStep) {
      case 0:
        newErrors.phone = !validatePhone(formData.prefix, formData.phone);
        break;
      case 1:
        newErrors.email = !formData.email || !validateEmail(formData.email);
        break;
      case 2:
        newErrors.password = !formData.password;
        break;
      case 4:
        newErrors.valeurs = formData.valeurs.length === 0;
        break;
      case 5:
        newErrors.name = !formData.name.trim();
        newErrors.profileImageBase64 = !formData.profileImageBase64;
        break;
      case 6:
        newErrors.size = !formData.size;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: e.target.value }));
    setErrors((prev) => ({ ...prev, phone: false }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, prefix: e.target.value }));
    setErrors((prev) => ({ ...prev, phone: false }));
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    else window.history.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Dernière validation
      if (!validateStep()) {
        setIsSubmitting(false);
        return;
      }

      const res = await fetch('http://localhost:3000/auth/registerindustry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert('Erreur inscription : ' + error.message);
        return;
      }

      const data = await res.json();
      window.location.href = `/inscription/entreprise/mission/?industryId=${data.user_id}`;
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    // 0: Phone
    <div
      key="phone"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mon numéro</h2>
      <p className="text-[#22002A] mb-8">
        On t'envoie un p'tit code par SMS, check ton tel 😊
      </p>
      <div className="flex items-center gap-2 mb-2">
        <select
          value={formData.prefix}
          onChange={handlePrefixChange}
          className="bg-white/20 text-[#22002A] px-4 py-3 rounded-lg border-[#22002A] border-2"
        >
          <option value="+33">🇫🇷 +33</option>
          <option value="+32">🇧🇪 +32</option>
          <option value="+41">🇨🇭 +41</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
        </select>
        <input
          type="tel"
          value={formData.phone}
          onChange={handlePhoneChange}
          className="w-full p-3 rounded-lg border-[#22002A] border-2 text-[#22002A]"
          placeholder="6 77 88 99 10"
        />
      </div>
      {errors.phone && (
        <p className="text-red-500 text-sm mb-4">Numéro invalide</p>
      )}
      <label className="flex items-center gap-2 mb-8 text-sm text-[#22002A]">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, newsletter: e.target.checked }))
          }
          className="w-4 h-4 accent-purple-500"
        />
        Je souhaite recevoir les nouveautés, les mises à jour et les offres de
        Blazed
      </label>
    </div>,
    // 1: Email
    <div
      key="email"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mon Email</h2>
      <p className="text-[#22002A] mb-8">
        T'as reçu le feu vert. File checker ton mail.
      </p>
      <div
        className={`w-full bg-white rounded-lg p-4 mb-2 text-center border-2 ${
          errors.email ? 'border-red-500' : 'border-[#22002A]'
        }`}
      >
        <input
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          className="w-full bg-transparent text-[#22002A] placeholder:text-[#E8E0EC] focus:outline-none"
          placeholder="Entrez votre email"
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mb-4">Email invalide</p>
      )}
      <label className="flex items-center gap-2 mb-8 text-sm text-[#22002A]">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, newsletter: e.target.checked }))
          }
          className="w-4 h-4 accent-purple-500"
        />
        Je souhaite recevoir les nouveautés, les mises à jour et les offres de
        Blazed
      </label>
    </div>,
    // 2: Password
    <div
      key="password"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mot de passe</h2>
      <p className="text-[#22002A] mb-8">
        Fais chauffer tes touches. Il est temps de sécuriser ton compte.
      </p>
      <div className="mb-2">
        <input
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
          className={`w-full p-3 rounded-lg border-2 ${
            errors.password ? 'border-red-500' : 'border-[#22002A]'
          } text-[#22002A]`}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">Mot de passe requis</p>
      )}
    </div>,
    // 3: Features
    <div
      key="features"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">
        Fonctionnalités
      </h2>
      <p className="text-[#22002A] mb-8">
        L'offre parfaite pour tester la vibe BLAZED en douceur.
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
        ].map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-sm text-[#22002A]"
          >
            <span className="mt-1 text-[#E8E0EC]">•</span>
            <span className={idx === 1 ? 'ml-4' : ''}>{feature}</span>
          </div>
        ))}
      </div>
    </div>,
    // 4: Domaines (valeurs)
    <div
      key="domains"
      className="flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-6 text-[#22002A]">Nos Valeurs</h2>
      <p className="text-[#22002A] mb-4">
        Ce que vous défendez, c'est ce que vous attirez. Balancez les vibes de
        votre team.
      </p>
      <div className="flex w-full flex-wrap">
        {valeursOptions.map((valeur) => {
          const isSelected = formData.valeurs.includes(valeur);
          return (
            <button
              key={valeur}
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  const newVals = prev.valeurs.includes(valeur)
                    ? prev.valeurs.filter((v) => v !== valeur)
                    : [...prev.valeurs, valeur];
                  return { ...prev, valeurs: newVals };
                });
                setErrors((prev) => ({ ...prev, valeurs: false }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                isSelected
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {valeur}
            </button>
          );
        })}
      </div>
      {errors.valeurs && (
        <p className="text-red-500 text-sm">
          Veuillez sélectionner au moins un domaine
        </p>
      )}
    </div>,
    // 5: Profile (name + image)
    <div
      key="profile"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <label className="text-4xl font-bold mb-4 text-[#22002A]">
        Le nom de mon entreprise
      </label>
      <input
        type="text"
        value={formData.name}
        onChange={handleNameChange}
        className={`mt-1 mb-4 block w-full p-3 rounded-lg border-2 bg-white ${
          errors.name ? 'border-red-500' : 'border-[#22002A]'
        } text-[#22002A]`}
        placeholder="Entrez le nom"
        required
      />
      {errors.name && <p className="text-red-500 text-sm mb-2">Nom requis</p>}
      <p className="text-[#22002A] mb-4">
        C'est ici que le nom de votre entreprise va apparaître. Faites-le
        briller, c'est votre première impression.
      </p>
      <label className="text-4xl font-bold mb-4 text-[#22002A]">
        Photo de profil
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={`block w-full p-3 rounded-lg border-2 text-[#22002A] bg-white ${
          errors.profileImageBase64 ? 'border-red-500' : 'border-[#22002A]'
        }`}
        required
      />
      {errors.profileImageBase64 && (
        <p className="text-red-500 text-sm mt-1">Image requise</p>
      )}
      {formData.profileImageBase64 && (
        <div className="mt-4 flex justify-center">
          <img
            src={formData.profileImageBase64}
            alt="Preview Profil"
            className="w-36 h-36 object-cover rounded-full border-2 border-[#22002A]"
          />
        </div>
      )}
    </div>,
    // 6: Taille
    <div
      key="size"
      className="flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold text-[#22002A] mb-6">
        La taille de mon entreprise
      </h2>
      <p className="text-[#22002A] mb-4">
        Plutôt solo ou grande groupe ? Dites-le nous !
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          'Microentreprise (MIC)',
          'Petite/Moyenne entreprise (PME)',
          'Entreprise de taille intermédiaire (ETI)',
          'Grandes entreprises (GE)',
        ].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, size: option }));
              setErrors((prev) => ({ ...prev, size: false }));
            }}
            className={`px-4 py-2 rounded-full font-medium border-2 ${
              formData.size === option
                ? 'bg-[#22002A] text-white border-[#22002A]'
                : 'bg-white text-[#22002A] border-[#22002A]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {errors.size && (
        <p className="text-red-500 text-sm mt-4">Merci de choisir une option</p>
      )}
    </div>,
    // 7: Final
    <div
      key="final"
      className="flex flex-col items-center justify-center h-full w-full text-center px-4"
    >
      <h2 className="text-4xl font-semibold mb-4 text-[#22002A]">
        Encore une étincelle et ton feu est prêt à brûler ! 😌
      </h2>
    </div>,
  ];

  const isLastStep = currentStep === steps.length - 1;

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

      <div className="flex-1 w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentStep * 100}%)` }}
        >
          {steps.map((step, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xs mt-auto">
        {isLastStep ? (
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Traitement...' : "S'inscrire"}
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition mb-[10px]"
          >
            Continuer
          </button>
        )}
      </div>
    </div>
  );
};

export default InscriptionEntreprise;
