import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLandingComponent } from './presentation/sections/hero/nova-landing.component';
import { AboutComponent } from './presentation/sections/about/about.component';
import { SkillsComponent } from './presentation/sections/skills/skills.component';
import { ProjectsComponent } from './presentation/sections/projects/projects.component';
import { AppsComponent } from './presentation/sections/apps/apps.component';
import { ExperienceComponent } from './presentation/sections/experience/experience.component';
import { CertificationsComponent } from './presentation/sections/certifications/certifications.component';
import { ContactComponent } from './presentation/sections/contact/contact.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NovaLandingComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    AppsComponent,
    ExperienceComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    <app-nova-landing />
    <main id="portfolio" class="portfolio-details">
      <app-about />
      <app-skills />
      <app-projects />
      <app-apps />
      <app-experience />
      <app-certifications />
      <app-contact />
    </main>
  `,
})
export class App {}
