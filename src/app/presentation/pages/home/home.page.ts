import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NovaLandingComponent } from '../../sections/hero/nova-landing.component';
import { AboutComponent } from '../../sections/about/about.component';
import { SkillsComponent } from '../../sections/skills/skills.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { AppsComponent } from '../../sections/apps/apps.component';
import { ExperienceComponent } from '../../sections/experience/experience.component';
import { CertificationsComponent } from '../../sections/certifications/certifications.component';
import { ContactComponent } from '../../sections/contact/contact.component';

/** The single-page portfolio (route ''): pure composition of the sections. */
@Component({
  selector: 'app-home-page',
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
export class HomePage {}
