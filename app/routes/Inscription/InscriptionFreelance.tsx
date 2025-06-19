import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function InscriptionFreelance() {
  const [currentStep, setCurrentStep] = useState(0);

  // Form data type definition
  type FormDataType = {
    phone: string;
    email: string;
    prefix: string;
    password: string;
    newsletter: boolean;
    terms: boolean;
    domaines: string[];
    firstName: string;
    lastName: string;
    profileImageBase64: string;
    profileTitle: string;
    dailyRate: string;
    locations: string[]; // New field // New field
    workType: string;
    workMethod: string;
    workLevel: string;
    hardSkills: string[];
    stacks: string[];
    langs: string[];
    speak: string[];
    softSkills: string[];
  };

  // Initial form state
  const [formData, setFormData] = useState<FormDataType>({
    phone: '',
    email: '',
    prefix: '+33',
    password: '',
    newsletter: false,
    terms: false,
    domaines: [],
    firstName: '',
    lastName: '',
    profileImageBase64: '',
    profileTitle: '',
    dailyRate: '',
    locations: [],
    workType: '',
    workMethod: '',
    workLevel: '',
    hardSkills: [],
    stacks: [],
    langs: [],
    speak: [],
    softSkills: [],
  });

  const handleSignupSuccess = (userId: string) => {
    window.location.href = `/?userId=${userId}`; // redirection avec paramètre dans l'URL
  };

  // Error states
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    password: false,
    firstName: false,
    lastName: false,
    profileImageBase64: false,
    profileTitle: false,
    dailyRate: false, // New error state// New error state
    workType: false,
    workMethod: false,
    workLevel: false,
  });

  // Available domains
  const domaines = [
    'Marketing',
    'Illustration',
    'Graphisme',
    'Infographie',
    'Animation 3D',
    'Motion Design',
    'Montage Video',
    'Web Design',
    'Communication',
    'UX/UI Design',
    'Développement Front-End',
    'Développement Back-End',
  ];

  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (prefix: string, phone: string) => {
    const fullNumber = `${prefix}${phone.replace(/^0/, '')}`;
    const re = /^\+\d{6,15}$/;
    return re.test(fullNumber);
  };

  // Convert image to base64
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

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const base64 = await fileToBase64(file);
        setFormData((prev) => ({ ...prev, profileImageBase64: base64 }));
      } catch (error) {
        console.error('Erreur conversion image', error);
      }
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {
      email: false,
      phone: false,
      password: false,
      firstName: false,
      lastName: false,
      profileImageBase64: false,
      profileTitle: false,
      dailyRate: false,
      workType: false,
      workMethod: false,
      workLevel: false,
      skills: false,
      langs: false,
      speak: false,
      softSkills: false,
    };

    let isValid = true;

    switch (currentStep) {
      case 0: // Phone validation
        if (!validatePhone(formData.prefix, formData.phone)) {
          newErrors.phone = true;
          isValid = false;
        }
        break;

      case 1: // Email validation
        if (!formData.email || !validateEmail(formData.email)) {
          newErrors.email = true;
          isValid = false;
        }
        break;

      case 2:
        if (!formData.password) {
          newErrors.password = true;
          isValid = false;
        }
        break;

      case 5:
        if (!formData.firstName.trim()) {
          newErrors.firstName = true;
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = true;
          isValid = false;
        }
        if (!formData.profileImageBase64) {
          newErrors.profileImageBase64 = true;
          isValid = false;
        }
        break;

      case 6:
        if (!formData.profileTitle.trim()) {
          newErrors.profileTitle = true;
          isValid = false;
        }
        break;

      case 7:
        if (!formData.profileTitle.trim()) {
          newErrors.profileTitle = true;
          isValid = false;
        }
        if (!formData.dailyRate.trim() || isNaN(Number(formData.dailyRate))) {
          newErrors.dailyRate = true;
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Navigation handler
  const handleNextStep = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
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
      alert('Inscription réussie, bienvenue ' + data.username);
      handleSignupSuccess(data.userId);
      // Redirection or reset logic here
    } catch (error) {
      alert('Erreur réseau, réessayez');
      console.error(error);
    }
  };

  // Form steps
  const steps = [
    // Step 0: Phone
    <div
      key="phone"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mon numéro</h2>
      <p className="text-[#22002A] mb-8">
        On t’envoie un p’tit code par SMS, check ton tel 😊
      </p>

      <div className="flex items-center gap-2 mb-2">
        <select
          value={formData.prefix}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, prefix: e.target.value }))
          }
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
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

    // Step 1: Email
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
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

    // Step 2: Password
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
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
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

    // Step 3: Features
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
    </div>,

    // Step 4: Domains
    <div
      key="interests"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Le Domaine</h2>
      <p className="text-[#22002A] mb-8">
        Balance ton terrain de jeu. Design, dev, stratégie... Choisis là où tu
        veux flamber.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        {domaines.map((domaine) => {
          const isSelected = formData.domaines.includes(domaine);

          return (
            <button
              key={domaine}
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  const newDomaines = prev.domaines.includes(domaine)
                    ? prev.domaines.filter((d) => d !== domaine)
                    : [...prev.domaines, domaine];

                  return { ...prev, domaines: newDomaines };
                });
              }}
              className={`px-4 py-2 rounded-full border-2 font-medium transition-colors
                ${
                  isSelected
                    ? 'bg-[#22002A] text-white border-[#22002A]'
                    : 'bg-white text-[#22002A] border-[#22002A]'
                }
                hover:bg-purple-500 hover:text-white hover:border-purple-500
              `}
            >
              {domaine}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 5: Profile
    <div
      key="profile"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <label className=" flex flex-col h-2em text-4xl font-bold mb-2 text-[#22002A]">
        Nom
      </label>
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, lastName: e.target.value }))
        }
        className={`mt-1 mb-8 block w-full p-3 rounded-lg border-2 bg-white ${
          errors.lastName ? 'border-red-500' : 'border-[#22002A]'
        } text-[#22002A]`}
        required
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm mt-1">Nom requis</p>
      )}

      <label className="block text-4xl font-bold text-[#22002A] mb-2">
        Prénom
      </label>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, firstName: e.target.value }))
        }
        className={`mt-1 block w-full p-3 rounded-lg border-2 mb-8 bg-white ${
          errors.firstName ? 'border-red-500' : 'border-[#22002A]'
        } text-[#22002A]`}
        required
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm mt-1">Prénom requis</p>
      )}

      <p className="text-[#22002A] mb-4">
        C'est la que ton Nom et prénom entre dans l'arène. Prépares-toi à faire
        tourner des têtes.
      </p>

      <label className="block text-4xl font-bold text-[#22002A] mb-2">
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
        <img
          src={formData.profileImageBase64}
          alt="Preview Profil"
          className="w-36 h-36 object-cover rounded-full mt-2 mx-auto"
        />
      )}
    </div>,

    // NEW STEP: Step 6 - Profile Title and Description
    <div
      key="profile-description"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">
        Titre du profil
      </h2>
      <p className="text-[#22002A] mb-8">
        Montre direct ce que tu sais faire. Les clients doivent savoir qui ils
        ont en face.
      </p>

      <div className="mb-6">
        <input
          type="text"
          value={formData.profileTitle}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profileTitle: e.target.value }))
          }
          className={`w-full p-3 rounded-lg border-2 ${
            errors.profileTitle ? 'border-red-500' : 'border-[#22002A]'
          } text-[#22002A]`}
          placeholder="Ex: Graphiste, Développeur Web, etc."
        />
        {errors.profileTitle && (
          <p className="text-red-500 text-sm mt-1">Titre requis</p>
        )}
      </div>
    </div>,
    <div className="mb-6">
      <h2 className="text-4xl font-bold mb-4 text-[#22002A] mb-6">Mon TJM</h2>
      <p className="text-[#22002A] mb-4">
        C'est le moment de définir ton <strong>tarif journalier moyen </strong>!
      </p>
      <input
        type="number"
        min="0"
        step="1"
        value={formData.dailyRate}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, dailyRate: e.target.value }))
        }
        className={`mt-1 block w-full p-3 rounded-lg border-2 bg-white ${
          errors.dailyRate ? 'border-red-500' : 'border-[#22002A]'
        } text-[#22002A]`}
        placeholder="Ex: 250 €"
        required
      />
      {errors.dailyRate && (
        <p className="text-red-500 text-sm mt-1">TJM invalide ou manquant</p>
      )}
    </div>,
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold mb-4 text-[#22002A] mb-6">
          Mon niveau
        </h2>
        <p className="text-[#22002A] mb-4">
          Junior qui monte ou expert ? A toi de poser tes cartes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Junior', 'Intermédiaire', 'Sénior'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  workLevel: option,
                }));
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
          <p className="text-red-500 text-sm mt-4">Choisis une option</p>
        )}
      </div>
    </div>,
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">
          Mes localisations
        </h2>
        <p className="text-[#22002A] mb-4">
          Partout en france ou que dans ta ville ? <br></br>Dis-nous où tu veux
          faire chauffer ton flow.
        </p>

        <div className="flex w-full flex-wrap">
          {[
            'Paris',
            'Lyon',
            'Lille',
            'Nice',
            'Marseille',
            'Toulouse',
            'Montepeillier',
            'Saint-Etienne',
            'Grenoble',
            'Nantes',
            'Bordeaux',
            'Strasbourg',
            'Partout en France',
          ].map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  locations: prev.locations.includes(location)
                    ? prev.locations.filter((l) => l !== location)
                    : [...prev.locations, location],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.locations.includes(location)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>,
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">
          Type de lieux
        </h2>
        <p className="text-[#22002A] mb-4">
          Bureau cosy, cowork en centre-ville ou télétravail total ? Choisis ton
          terrain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['Sur site', 'A distance', 'Un mix des 2'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  workType: option,
                }));
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
          <p className="text-red-500 text-sm mt-4">Choisis une option</p>
        )}
      </div>
    </div>,
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">
          Méthode de travail
        </h2>
        <p className="text-[#22002A] mb-4">
          Solo en mode sniper ou en team ? Dis-nous comment tu bosses le mieux.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['En équipe', 'En Solo', 'Un mix des 2'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  workMethod: option,
                }));
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
          <p className="text-red-500 text-sm mt-4">
            Merci de choisir une option
          </p>
        )}
      </div>
    </div>,

    // Filler
    <div className="flex justify-center items-center h-full w-full">
      <h2 className="text-2xl font-semibold mb-2 text-black text-center">
        Encore une étincelle et ton feu est prêt à brûler !{' '}
        <span role="img" aria-label="content">
          😌
        </span>
      </h2>
    </div>,

    // Hard Skills
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">
          Mes Hard Skills
        </h2>
        <p className="text-[#22002A] mb-4">
          Ce que tu maîtrises comme un pro. Les vraies compétences techniques
          qui claquent.
        </p>

        <div className="flex w-full flex-wrap">
          {[
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
          ].map((skills) => (
            <button
              key={skills}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  hardSkills: prev.hardSkills.includes(skills)
                    ? prev.hardSkills.filter((l) => l !== skills)
                    : [...prev.hardSkills, skills],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.hardSkills.includes(skills)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {skills}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Logiciels
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">Logiciels</h2>
        <p className="text-[#22002A] mb-4">
          Fais ton stack : quels outils te suivent au combat?
        </p>

        <div className="flex w-full flex-wrap">
          {[
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
          ].map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  stacks: prev.stacks.includes(stack)
                    ? prev.stacks.filter((l) => l !== stack)
                    : [...prev.stacks, stack],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.stacks.includes(stack)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {stack}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Langages
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">Langages</h2>
        <p className="text-[#22002A] mb-4">
          Python, React, PHP ? Montre avec quoi tu codes le feu.
        </p>

        <div className="flex w-full flex-wrap">
          {[
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
            'Aucun',
          ].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  langs: prev.langs.includes(lang)
                    ? prev.langs.filter((l) => l !== lang)
                    : [...prev.langs, lang],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.langs.includes(lang)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // SoftSkills
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">
          Mes Soft Skills
        </h2>
        <p className="text-[#22002A] mb-4">
          Ta vibe, ton mindset, ton flow. Tu sais faire, mais tu sais aussi
          être.
        </p>

        <div className="flex w-full flex-wrap">
          {[
            'Créativité',
            'Adaptabilité',
            'Autonomie',
            'Communication',
            `Esprit d'équipe`,
            'Organisation',
            'Curiosité',
            'Rigueur',
            'Empathie',
            'Polyvalence',
            'Leadership',
            'Sens du travail',
          ].map((soft) => (
            <button
              key={soft}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  softSkills: prev.softSkills.includes(soft)
                    ? prev.softSkills.filter((l) => l !== soft)
                    : [...prev.softSkills, soft],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.softSkills.includes(soft)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {soft}
            </button>
          ))}
        </div>
      </div>
    </div>,

    // Langues parlées
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2 className="text-4xl font-bold text-[#22002A] mb-6">Mes langues</h2>
        <p className="text-[#22002A] mb-4">
          Polyglotte ou pro du franglais, indique ce que tu gères à l'oral comme
          à l'écrit.
        </p>

        <div className="flex w-full flex-wrap">
          {[
            'Français',
            'Anglais',
            'Espagnol',
            'Italien',
            'Allemand',
            'Russe',
            'Mandarin',
            'Coréen',
            'Aucun',
          ].map((spoke) => (
            <button
              key={spoke}
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  speak: prev.speak.includes(spoke)
                    ? prev.speak.filter((l) => l !== spoke)
                    : [...prev.speak, spoke],
                }));
              }}
              className={`flex px-4 py-2 rounded-full font-medium m-1 border-2 ${
                formData.speak.includes(spoke)
                  ? 'bg-[#22002A] text-white border-[#22002A]'
                  : 'bg-white text-[#22002A] border-[#22002A]'
              }`}
            >
              {spoke}
            </button>
          ))}
        </div>
      </div>
    </div>,

    //Fonctionnalités
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
    </div>,
  ];

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return validatePhone(formData.prefix, formData.phone);
      case 1:
        return formData.email && validateEmail(formData.email);
      case 2:
        return formData.password !== '';
      case 5:
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.profileImageBase64 !== ''
        );
      case 6:
        return formData.profileTitle.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full min-h-screen bg-[url('/background.png')] bg-cover bg-center flex flex-col items-center px-6 py-10"
    >
      <div className="w-full flex justify-between items-center mb-12">
        <button
          type="button"
          onClick={() =>
            currentStep > 0
              ? setCurrentStep((prev) => prev - 1)
              : window.history.back()
          }
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

      <button
        type={currentStep === steps.length - 1 ? 'submit' : 'button'}
        onClick={(e) => {
          if (currentStep === steps.length - 1) {
            return;
          }

          e.preventDefault();

          if (currentStep === steps.length - 2) {
            setCurrentStep((prev) => prev + 1);
          } else {
            handleNextStep();
          }
        }}
        className="w-full max-w-xs bg-white text-black font-bold py-3 rounded-full hover:bg-grey-200 transition disabled:opacity-50"
        disabled={!isStepValid()}
      >
        {currentStep === steps.length - 1 ? 'Terminer' : 'Continuer'}
      </button>
    </form>
  );
}
