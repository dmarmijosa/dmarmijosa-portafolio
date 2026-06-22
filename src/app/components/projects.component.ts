import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { PROJECTS } from '../data/portfolio.data';
import { Project, ProjectCategory } from '../models/portfolio.models';
import { RevealDirective } from '../directives/reveal.directive';
import { TiltDirective } from '../directives/tilt.directive';
import { IconComponent } from './icon.component';

type Filter = ProjectCategory | 'Todos';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, TiltDirective, IconComponent],
  template: `
    <section id="projects" class="relative mx-auto max-w-6xl px-6 py-24">
      <div class="mb-10 text-center" appReveal>
        <p class="font-mono text-sm font-medium text-accent-400">// portafolio</p>
        <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Proyectos <span class="text-gradient">en producción</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-slate-400">
          Una selección de aplicaciones reales, todas verificadas y en línea. Haz clic para visitarlas.
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-10 flex flex-wrap justify-center gap-2" appReveal>
        @for (f of filters; track f) {
          <button
            type="button"
            (click)="activeFilter.set(f)"
            class="rounded-full px-4 py-1.5 text-sm font-medium transition-all"
            [class]="
              activeFilter() === f
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
            "
            [attr.aria-pressed]="activeFilter() === f"
          >
            {{ f }}
          </button>
        }
      </div>

      <!-- Grid -->
      <div class="scene-3d grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (project of visibleProjects(); track project.title; let i = $index) {
          <a
            [href]="project.url"
            target="_blank"
            rel="noopener"
            appReveal
            [delay]="(i % 3) * 80"
            appTilt
            [maxTilt]="11"
            class="group relative flex flex-col overflow-hidden rounded-2xl glass border-glow p-px transition-shadow hover:shadow-2xl hover:shadow-brand-500/25"
            [attr.aria-label]="'Abrir ' + project.title + ' en una pestaña nueva'"
          >
            <!-- Accent banner -->
            <div
              class="relative flex h-32 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br"
              [class]="project.accent"
            >
              <span class="text-5xl drop-shadow-lg transition-transform duration-300 group-hover:scale-125" style="transform: translateZ(50px);">
                {{ project.glyph }}
              </span>
              @if (project.featured) {
                <span class="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  <app-icon name="star" [size]="13" /> Destacado
                </span>
              }
              <span class="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {{ project.category }}
              </span>
            </div>

            <!-- Body -->
            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-display text-lg font-bold text-white">{{ project.title }}</h3>
                <span class="text-slate-500 transition-colors group-hover:text-accent-400">
                  <app-icon name="external" [size]="18" />
                </span>
              </div>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{{ project.description }}</p>
              <ul class="mt-4 flex flex-wrap gap-1.5">
                @for (tech of project.tech; track tech) {
                  <li class="rounded-md bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-300">{{ tech }}</li>
                }
              </ul>
            </div>
          </a>
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  protected readonly filters: readonly Filter[] = [
    'Todos', 'Web App', 'E-commerce', 'Landing', 'IA', 'Móvil',
  ];
  protected readonly activeFilter = signal<Filter>('Todos');

  private readonly all = PROJECTS;

  protected readonly visibleProjects = computed<readonly Project[]>(() => {
    const filter = this.activeFilter();
    const list = filter === 'Todos' ? this.all : this.all.filter((p) => p.category === filter);
    // featured first, preserving source order otherwise
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  });
}
