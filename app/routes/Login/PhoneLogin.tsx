import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function PhoneLogin() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    prefix: '+33',
    newsletter: false,
  });
  const [errors, setErrors] = useState({
    phone: false,
    password: false,
  });

  const validatePhone = (prefix: string, phone: string) => {
    const fullNumber = `${prefix}${phone.replace(/^0/, '')}`;
    const re = /^\+\d{6,15}$/;
    return re.test(fullNumber);
  };

  const validateStep = () => {
    let isValid = true;
    const newErrors = { phone: false, password: false };

    switch (currentStep) {
      case 0:
        if (
          !formData.phone ||
          !validatePhone(formData.prefix, formData.phone)
        ) {
          newErrors.phone = true;
          isValid = false;
        }
        break;
      case 1:
        if (!formData.password) {
          newErrors.password = true;
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep() && currentStep < 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showForgotPassword) {
      console.log('Password reset requested for:', formData.phone);
      return;
    }
    if (validateStep()) {
      console.log('Data submitted:', formData);
    }
  };

  const steps = [
    // Étape 1 - Téléphone
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
          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
          className="bg-white/20 text-[#22002A] px-4 py-3 rounded-lg"
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
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full p-3 rounded-lg ${
            errors.phone ? 'border-red-500' : 'border-[#22002A]'
          } border-2 text-[#22002A]`}
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
            setFormData({ ...formData, newsletter: e.target.checked })
          }
          className="w-4 h-4 accent-purple-500"
        />
        Je souhaite recevoir les nouveautés, les mises à jour et les offres de
        Blazed
      </label>
    </div>,

    // Étape 2 - Mot de passe
    <div
      key="password"
      className="flex-1 flex flex-col justify-start pb-16 w-full max-w-xs text-left"
    >
      <h2 className="text-4xl font-bold mb-4 text-[#22002A]">Mot de passe</h2>
      <p className="text-[#22002A] mb-8">
        Fais chauffer les touches. Il est temps de sécuriser ton compte.
      </p>

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
          placeholder="••••••••"
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
            <span className="font-medium">
              {formData.prefix} {formData.phone.replace(/^0/, '')}
            </span>
          </div>
          <button
            type="submit"
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

          <button
            type={currentStep === steps.length - 1 ? 'submit' : 'button'}
            onClick={handleNextStep}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-full hover:bg-purple-700 transition disabled:opacity-50"
            disabled={
              (currentStep === 0 &&
                (!formData.phone ||
                  !validatePhone(formData.prefix, formData.phone))) ||
              (currentStep === 1 && !formData.password)
            }
          >
            {currentStep === steps.length - 1 ? 'Terminer' : 'Continuer'}
          </button>
        </>
      )}
    </form>
  );
}
