import { Routes } from '@angular/router';
import { HomePage } from './presentation/pages/home/home.page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Danny Armijos — Software Engineer & Full Stack Developer' },
  // Legal pages required by the App Store / Google Play listings of VerbDuel.
  {
    path: 'verbduel/privacy',
    title: 'Política de privacidad — VerbDuel',
    loadComponent: () =>
      import('./presentation/pages/verbduel/verbduel-privacy.page').then((m) => m.VerbDuelPrivacyPage),
  },
  {
    path: 'verbduel/delete-account',
    title: 'Eliminar cuenta — VerbDuel',
    loadComponent: () =>
      import('./presentation/pages/verbduel/verbduel-delete-account.page').then(
        (m) => m.VerbDuelDeleteAccountPage,
      ),
  },
  { path: '**', redirectTo: '' },
];
