import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/Login/Login.tsx'),
  route('login/email', 'routes/Login/MailLogin.tsx'),
  route('login/phone', 'routes/Login/PhoneLogin.tsx'),
  route('inscription', 'routes/Inscription/Inscription.tsx'),
  route('inscription/freelance', 'routes/Inscription/InscriptionFreelance.tsx'),

  // Updated enterprise routes
  route(
    'inscription/entreprise',
    'routes/Inscription/InscriptionEntreprise.tsx'
  ),
  route(
    'inscription/entreprise/mission/:industryId',
    'routes/Inscription/InscriptionEntrepriseMission.tsx'
  ),

  // Other routes
  route('cards/:userId', 'routes/Cards/cards.tsx'),
  route('gestion/:userId', 'routes/Gestion/gestion.tsx'),
  route('paiements/:userId', 'routes/Gestion/paiements.tsx'),
  route('messagerie/:userId', 'routes/Messages/messages.tsx'),
  route('profile/:userId', 'routes/Profile/profile.tsx'),
] satisfies RouteConfig;
