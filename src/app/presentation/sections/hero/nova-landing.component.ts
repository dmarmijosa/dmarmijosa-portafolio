import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { PortfolioRepository } from '../../../core/domain/repositories/portfolio.repository';
import { LocaleService } from '../../shared/i18n/locale.service';

@Component({
  selector: 'app-nova-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()', '(window:resize)': 'onScroll()' },
  template: `
    <a class="nova-skip" href="#intro">{{ en() ? 'Skip to content' : 'Ir al contenido' }}</a>
    <div class="nova-guides" aria-hidden="true"><i></i><i></i><i></i></div>
    <div id="robot-stage" aria-hidden="true">
      <div class="robot-fallback">DA<span>••</span></div>
    </div>
    <header class="nova-chrome" [class.compact]="scrolled() || dismissed()">
      <div class="nova-announcement">
        <span>{{ profile().availability }} · Angular, IA & Cloud ↗</span
        ><button aria-label="Cerrar aviso" (click)="dismissed.set(true)">×</button>
      </div>
      <nav class="nova-nav" aria-label="Principal">
        <a href="#top" class="nova-logo"
          ><span class="nova-mark">••</span> DANNY ARMIJOS<span class="logo-dot">®</span></a
        >
        <div class="nova-links">
          <a href="#projects">{{ en() ? 'Selected work' : 'Proyectos' }} ↗</a
          ><a href="#about">{{ en() ? 'About me' : 'Sobre mí' }}</a
          ><a href="#experience">{{ en() ? 'Experience' : 'Experiencia' }}</a>
        </div>
        <button class="nova-language" (click)="loc.toggle()" aria-label="Cambiar idioma">
          {{ en() ? 'ES' : 'EN' }} ↗
        </button>
        <a class="nova-launch" [href]="'mailto:' + profile().email"
          >•• {{ en() ? 'LET’S TALK' : 'HABLEMOS' }} ↗</a
        >
      </nav>
    </header>
    <aside
      class="nova-rail"
      [hidden]="!railVisible()"
      [attr.aria-label]="en() ? 'Sections' : 'Secciones'"
    >
      <nav [attr.aria-label]="en() ? 'Page sections' : 'Secciones de la página'" class="rail-track">
        <span class="rail-dots" aria-hidden="true"></span>
        <span
          class="rail-indicator"
          aria-hidden="true"
          [style.transform]="'translateY(' + chapter() * 72 + 'px)'"
          >◉</span
        >
        @for (section of railSections(); track section.id; let i = $index) {
          <a
            [href]="'#' + section.id"
            class="rail-label"
            [class.active]="chapter() === i"
            [attr.aria-current]="chapter() === i ? 'location' : null"
          >
            <span class="rail-number" aria-hidden="true">0{{ i + 1 }}</span
            >{{ section.label }}
          </a>
        }
      </nav>
      <a href="#portfolio" class="rail-menu">≡ {{ en() ? 'EXPLORE' : 'EXPLORAR' }} ↗</a>
    </aside>
    <section class="nova-scene nova-intro" id="intro" aria-labelledby="nova-title">
      <span id="top"></span>
      <div class="nova-prompt rv">
        <div class="prompt-tab">“</div>
        <p class="prompt-frame">
          <span class="sr-only">{{
            en() ? 'Building digital products with AI.' : 'Construyendo productos digitales con IA.'
          }}</span
          ><span aria-hidden="true">{{ typed() }}<i class="typing-caret"></i></span>
        </p>
        <p class="prompt-next">
          {{
            en()
              ? 'FROM A FIRST IDEA TO A REAL PRODUCT.'
              : 'DE UNA PRIMERA IDEA A UN PRODUCTO REAL.'
          }}
        </p>
      </div>
      <div class="nova-features rv">
        <span>● &nbsp; FULL STACK DEVELOPMENT</span><span>● &nbsp; AI AGENTS & AUTOMATION</span
        ><span>● &nbsp; CLOUD ARCHITECTURE</span
        ><span>↗ &nbsp; {{ en() ? 'AND MUCH MORE' : 'Y MUCHO MÁS' }}</span>
      </div>
      <div class="nova-headline rv">
        <p class="nova-mono">
          {{ en() ? 'HUMAN IDEAS. INTELLIGENT SOFTWARE.' : 'IDEAS HUMANAS. SOFTWARE INTELIGENTE.' }}
        </p>
        <h1 id="nova-title"><span>Danny Armijos</span><span>Thinking. Building.</span></h1>
        <p class="nova-mono hero-role">SOFTWARE ENGINEER · FULL STACK & AI</p>
      </div>
      <p class="nova-subline rv">
        {{
          en()
            ? 'I turn complex ideas into digital experiences that make a difference.'
            : 'Transformo ideas complejas en experiencias digitales que marcan la diferencia.'
        }}
      </p>
      <a href="#selected-work" class="nova-scroll">SCROLL <span>↓</span></a>
      <span class="scene-index nova-mono">01 / 03 — {{ profile().location }}</span>
    </section>
    <section class="nova-scene nova-product" id="selected-work" aria-labelledby="work-title">
      <div class="nova-work-strip rv">
        <span class="nova-mono"
          >{{ en() ? 'SELECTED WORK' : 'PROYECTOS SELECCIONADOS' }} / 0{{
            projectIndex() + 1
          }}</span
        >
        <div class="project-tabs">
          @for (project of projects(); track project.title; let i = $index) {
            <button
              [class.active]="projectIndex() === i"
              [attr.aria-pressed]="projectIndex() === i"
              (click)="selectProject(i)"
            >
              <span>0{{ i + 1 }}</span
              >{{ project.title }} ↗
            </button>
          }
        </div>
      </div>
      <div class="nova-project-copy rv">
        <p class="nova-mono">{{ project().tech.slice(0, 3).join(' / ') }}</p>
        <h2 id="work-title">
          {{ en() ? 'From possibility' : 'De lo posible' }}<br /><span>{{
            en() ? 'to production.' : 'a producción.'
          }}</span>
        </h2>
        <h3>{{ project().title }}</h3>
        <p>{{ project().description }}</p>
        <a [href]="project().url" target="_blank" rel="noopener noreferrer"
          >{{ en() ? 'EXPLORE PROJECT' : 'EXPLORAR PROYECTO' }} ↗</a
        >
      </div>
      <div class="nova-work-stats rv">
        @for (stat of stats(); track stat.label) {
          <div>
            <strong>{{ stat.value }}</strong
            ><span class="nova-mono">{{ stat.label }}</span>
          </div>
        }
      </div>
      <span class="scene-index nova-mono">02 / 03 — ENGINEERED WITH PURPOSE</span>
    </section>
    <section class="nova-scene nova-reviews" id="reviews" aria-labelledby="review-title">
      <h2 class="sr-only" id="review-title">{{ en() ? 'Recommendations' : 'Recomendaciones' }}</h2>
      <div class="nova-review-header rv">
        <span class="nova-mono"
          >{{ en() ? 'PEOPLE /' : 'PERSONAS /' }} 0{{ reviewIndex() + 1 }}</span
        ><span class="review-avatar" aria-hidden="true">{{ review().author.charAt(0) }}</span>
        <div>
          <strong>{{ review().author }}</strong>
          <p class="nova-mono">{{ review().role }}</p>
        </div>
      </div>
      <div class="nova-review-copy rv" [class.swapping]="swapping()" aria-live="polite">
        <blockquote>“{{ review().text }}”</blockquote>
        <a [href]="profile().linkedin" target="_blank" rel="noopener noreferrer"
          >{{ en() ? 'Connect on LinkedIn' : 'Conectemos en LinkedIn' }} ↗</a
        >
      </div>
      <div class="nova-review-controls">
        <button (click)="changeReview(-1)" aria-label="Recomendación anterior">←</button
        ><button (click)="changeReview(1)" aria-label="Siguiente recomendación">→</button
        ><span class="nova-mono">0{{ reviewIndex() + 1 }} / 0{{ reviews().length }}</span>
      </div>
      <p class="nova-ghost" aria-hidden="true">
        {{ reviews()[(reviewIndex() + 1) % reviews().length].text }}
      </p>
      <span class="scene-index nova-mono">03 / 03 — BETTER TOGETHER</span>
    </section>
  `,
})
export class NovaLandingComponent {
  protected readonly loc = inject(LocaleService);
  private readonly repo = inject(PortfolioRepository);
  private readonly destroy = inject(DestroyRef);
  protected readonly en = computed(() => this.loc.locale() === 'en');
  protected readonly profile = computed(() => this.repo.getProfile(this.loc.locale()));
  protected readonly stats = computed(() => this.repo.getStats(this.loc.locale()));
  protected readonly projects = computed(() =>
    this.repo.getProjects(this.loc.locale()).filter((p) => p.featured),
  );
  protected readonly reviews = computed(() => this.repo.getRecommendations(this.loc.locale()));
  protected readonly projectIndex = signal(0);
  protected readonly reviewIndex = signal(0);
  protected readonly project = computed(() => this.projects()[this.projectIndex()]);
  protected readonly review = computed(() => this.reviews()[this.reviewIndex()]);
  protected readonly scrolled = signal(false);
  protected readonly dismissed = signal(false);
  protected readonly chapter = signal(0);
  protected readonly railVisible = signal(true);
  protected readonly railSections = computed(() => [
    { id: 'intro', label: 'Intro' },
    { id: 'selected-work', label: this.en() ? 'Work' : 'Proyectos' },
    { id: 'reviews', label: this.en() ? 'Reviews' : 'Reseñas' },
  ]);
  protected readonly swapping = signal(false);
  protected readonly typed = signal('');
  private reviewTimer?: ReturnType<typeof setTimeout>;
  private projectTimer?: ReturnType<typeof setInterval>;
  protected selectProject(index: number): void {
    this.projectIndex.set(index);
    clearInterval(this.projectTimer);
  }
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
    const sections = this.railSections().map((section) => document.getElementById(section.id));
    const midpoint = window.innerHeight / 2;
    let active = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= midpoint) active = index;
    });
    this.chapter.set(active);
    const lastSection = sections.at(-1);
    this.railVisible.set(!!lastSection && lastSection.getBoundingClientRect().bottom > midpoint);
  }

  protected changeReview(direction: number): void {
    if (this.swapping()) return;
    this.swapping.set(true);
    this.reviewTimer = setTimeout(() => {
      this.reviewIndex.update(
        (i) => (i + direction + this.reviews().length) % this.reviews().length,
      );
      this.swapping.set(false);
    }, 450);
  }
  constructor() {
    afterNextRender(() => {
      this.onScroll();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prompts = this.en()
        ? [
            'Build a scalable application with Angular and NestJS.',
            'Connect your business to the power of AI agents.',
            'Turn a great idea into your next digital product.',
          ]
        : [
            'Crea una aplicación escalable con Angular y NestJS.',
            'Conecta tu negocio con el poder de los agentes IA.',
            'Transforma una gran idea en tu próximo producto digital.',
          ];
      let index = 0,
        length = 0,
        deleting = false,
        timer: ReturnType<typeof setTimeout>;
      const type = () => {
        const prompt = prompts[index];
        length = deleting ? Math.max(0, length - 2) : Math.min(prompt.length, length + 1);
        this.typed.set(prompt.slice(0, length));
        let delay = deleting ? 14 : 38;
        if (length === prompt.length && !deleting) {
          deleting = true;
          delay = 2600;
        } else if (!length && deleting) {
          deleting = false;
          index = (index + 1) % prompts.length;
          delay = 250;
        }
        timer = setTimeout(type, delay);
      };
      if (reduced) this.typed.set(prompts[0]);
      else {
        type();
        this.projectTimer = setInterval(
          () => this.projectIndex.update((i) => (i + 1) % this.projects().length),
          4800,
        );
      }
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('revealed');
              observer.unobserve(e.target);
            }
          }),
        { threshold: 0.15 },
      );
      document.querySelectorAll('.rv').forEach((el) => observer.observe(el));
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'nova-robot.js';
      document.body.append(script);
      this.destroy.onDestroy(() => {
        clearTimeout(timer);
        clearTimeout(this.reviewTimer);
        clearInterval(this.projectTimer);
        observer.disconnect();
        window.dispatchEvent(new Event('nova-dispose'));
        script.remove();
      });
    });
  }
}
