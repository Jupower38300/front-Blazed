import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function MailLogin() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    api: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = { email: false, password: false, api: '' };

    if (
      currentStep === 0 &&
      (!formData.email || !validateEmail(formData.email))
    ) {
      newErrors.email = true;
      isValid = false;
    }

    if (currentStep === 1 && !formData.password) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep() && currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 0) {
      if (validateStep()) {
        setCurrentStep(1);
      }
      return;
    }

    // Dans handleSubmit (étape 1)
    if (currentStep === 1) {
      try {
        const response = await fetch(
          'https://blazed-back.onrender.com/auth/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          // Gestion erreur
          return;
        }

        // Stockage du token dans localStorage
        localStorage.setItem('authToken', data.access_token);

        window.location.href = `/cards/${data.user_id}`;
      } catch (err) {
        // Gestion erreur
      }
    }
  };

  // Déclaration des étapes
  const steps = [
    <div
      key="email"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mon Email</h2>
      <p className="text-[#22002A] mb-8">
        T'as reçu le feu vert. File checker ton mail.
      </p>
      <div
        className={`w-full bg-white rounded-lg p-4 mb-2 text-center border-solid ${
          errors.email ? 'border-red-500' : 'border-[#22002A]'
        } border-4`}
      >
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-transparent text-[#22002A] placeholder:text-[#E8E0EC] focus:outline-none text-center"
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
            setFormData({ ...formData, newsletter: e.target.checked })
          }
          className="w-4 h-4 accent-purple-500"
        />
        Je souhaite recevoir les nouveautés, les mises à jour et les offres de
        Blazed
      </label>
    </div>,

    <div
      key="password"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mot de passe</h2>
      <div className="mb-2">
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className={`w-full p-3 rounded-lg ${
            errors.password ? 'border-red-500' : 'border-[#22002A]'
          } border-2 text-[#22002A]`}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mb-4">Mot de passe requis</p>
      )}

      <button
        type="button"
        onClick={() => setShowForgotPassword(true)}
        className="text-[#22002A] text-sm mb-8 underline"
      >
        Mot de passe oublié ?
      </button>
    </div>,

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

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full h-screen bg-[url('/background.png')] bg-cover bg-center flex flex-col items-center px-6 py-10"
    >
      <div className="w-full flex justify-between items-center mb-12">
        <button
          type="button"
          onClick={() => {
            if (showForgotPassword) {
              setShowForgotPassword(false);
            } else {
              currentStep > 0
                ? setCurrentStep((prev) => prev - 1)
                : window.history.back();
            }
          }}
          className="text-[#22002A] bg-white/20 p-2 rounded-full hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-9" />
      </div>

      {showForgotPassword ? (
        <div className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left">
          <h2 className="text-4xl font-bold mb-4 text-[#22002A]">
            Tu as oublié ton mot de passe ?
          </h2>
          <p className="text-[#22002A] mb-8">
            T’inquiète, ça arrive même aux meilleurs. On te remet sur pied.
          </p>
          <div className="w-full bg-white text-[#E8E0EC] rounded-lg p-4 mb-8 text-center border-solid border-[#22002A] border-4">
            <span className="font-medium">{formData.email}</span>
          </div>
          <button
            type="button"
            onClick={() => alert('Fonctionnalité à implémenter')}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-full hover:bg-purple-700 transition"
          >
            Envoyer les instructions
          </button>
        </div>
      ) : (
        <>
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

          {errors.api && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {errors.api}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-full hover:bg-purple-700 transition disabled:opacity-50"
            disabled={
              (currentStep === 0 && (!formData.email || errors.email)) ||
              (currentStep === 1 && !formData.password)
            }
          >
            {currentStep === 2 ? 'Terminer' : 'Continuer'}
          </button>
        </>
      )}
    </form>
  );
}
