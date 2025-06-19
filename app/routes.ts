import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/Login/Login.tsx'),
  route('login/email', 'routes/Login/MailLogin.tsx'),
  route('login/phone', 'routes/Login/PhoneLogin.tsx'),
  route('inscription', 'routes/Inscription/Inscription.tsx'),
  route('inscription/freelance', 'routes/Inscription/InscriptionFreelance.tsx'),
  route(
    'inscription/entreprise',
    'routes/Inscription/InscriptionEntreprise.tsx'
  ),

  route(
    'inscription/mission',
    'routes/Inscription/InscriptionEntrepriseMission.tsx'
  ),
  route('cards/:userId', 'routes/Cards/cards.tsx'), // Ajout du paramètre userId
  route('gestion/:userId', 'routes/Gestion/gestion.tsx'), // Paramètre optionnel
  route('paiements/:userId', 'routes/Gestion/paiements.tsx'), // Paramètre optionnel
  route('messagerie/:userId', 'routes/Messages/messages.tsx'), // Paramètre optionnel
  route('profile/:userId', 'routes/Profile/profile.tsx'), // Paramètre optionnel
] satisfies RouteConfig;
