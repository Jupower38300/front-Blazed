import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blazed' },
    {
      name: 'description',
      content: 'Application Blazed, fais flamber le marché!',
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
