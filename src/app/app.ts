import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './presentation/sections/navbar/navbar.component';
import { HeroComponent } from './presentation/sections/hero/hero.component';
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
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    AppsComponent,
    ExperienceComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    <div class="cinematic-stage" aria-hidden="true">
      <div class="stage-orb"></div>
      <div class="stage-rail stage-rail-left"></div>
      <div class="stage-rail stage-rail-right"></div>
      <div class="stage-code-rain">
        <span>Angular</span>
        <span>NestJS</span>
        <span>Flutter</span>
        <span>n8n</span>
        <span>Agents</span>
      </div>
      <div class="stage-vertical">FULL STACK · IA · CLOUD</div>
    </div>
    <app-navbar />
    <main>
      <app-hero />
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
