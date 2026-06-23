# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio of Danny Armijos — a single-page Angular 22 + Tailwind CSS v4 app
with interactive 3D effects, runtime i18n, and Clean Architecture.

> Coding conventions (signals, standalone components, `inject()`, no `@HostBinding`/
> `ngClass`/`ngStyle`, `NgOptimizedImage`, accessibility) live in [.claude/CLAUDE.md](.claude/CLAUDE.md)
> (mirrored in `AGENTS.md`). They are not repeated here.

## Commands

```bash
npm start                  # ng serve → http://localhost:4200 (dev server)
npm run build              # production build → dist/dmarmijosa-portafolio/browser
npm run watch              # build --watch (development config)
npx ng test --watch=false  # run the Vitest suite once
npx ng test                # Vitest in watch mode
```

- Test runner is **Vitest** via the `@angular/build:unit-test` builder (jsdom env).
  To focus a single test, use Vitest's `it.only` / `describe.only` in the `*.spec.ts`.
- After generating code, **always run `npx ng build`** and fix errors before finishing.
- Profile/app images are committed pre-optimized. When adding large images, resize with
  `sips --resampleHeightWidthMax 600 <file>` (macOS) before putting them in `public/`.

## Architecture — Clean Architecture

Dependencies always point inward (presentation → application → domain). Infrastructure
implements domain ports and is wired by DI. Layers under `src/app/`:

- `core/domain/` — framework-agnostic core.
  - `entities/` — plain interfaces (`Profile`, `Project`, `MobileApp`, …).
  - `value-objects/locale.ts` — `Locale` type + `resolveLocale()`.
  - `repositories/portfolio.repository.ts` — **`PortfolioRepository`** abstract port.
    Every method takes a `Locale`.
- `core/application/use-cases/` — one injectable use case per concern
  (`GetProfileUseCase`, `GetProjectsUseCase`, …). They `inject(PortfolioRepository)`
  and accept a `Locale`. **Presentation only talks to use cases, never the repository.**
- `core/infrastructure/repositories/in-memory-portfolio.repository.ts` —
  `InMemoryPortfolioRepository`, the single source of truth for all content.
- `presentation/` — `sections/` (one component per page section: navbar, hero, about,
  skills, projects, apps, experience, certifications, contact) and `shared/`
  (`components/`, `directives/`, `i18n/`).

The port↔implementation binding is in `app.config.ts`:
`{ provide: PortfolioRepository, useClass: InMemoryPortfolioRepository }`. To swap the
data source (e.g. an HTTP/CMS backend), add a new `PortfolioRepository` implementation
and change only that provider — domain and presentation stay untouched.

`app.ts` is pure composition: it lays out the section components in order. There is no
routing (`app.routes.ts` is empty); navigation is in-page anchor scrolling.

## i18n (runtime ES/EN)

Runtime language switching, not Angular's build-time `$localize`.

- `presentation/shared/i18n/locale.service.ts` — **`LocaleService`** holds a
  `locale = signal<Locale>()`, initialized from `localStorage` then `navigator.language`,
  persisted via `effect`, and kept in sync with `<html lang>`. `t(key, params?)`
  translates UI strings; `toggle()` flips ES↔EN.
- `presentation/shared/i18n/ui.translations.ts` — UI string dictionary (labels, buttons,
  section headings) keyed by dotted paths, for both locales.
- **Domain content** (profile, project descriptions, etc.) is NOT in the dictionary. It is
  stored inline as `{ es, en }` in the repository and resolved per-locale there.

Components are locale-reactive: they read content through
`computed(() => useCase.method(loc.locale()))`, and UI labels via `loc.t('key')` in
templates (method calls track the `locale` signal, so the view updates on toggle).

### Critical: avoid NG0956 (`@for` re-creation)

Two rules keep localized lists from destroying/recreating DOM on every change detection:

1. `InMemoryPortfolioRepository.resolve(locale)` **memoizes** resolved content per locale
   so getters return stable array references (references change only when the locale does).
2. For fixed-order localized lists, `@for` must `track $index` — never `track item.field`
   when the field is a translated string (the key changes with locale and forces re-creation).

## 3D effects

- `presentation/shared/directives/tilt.directive.ts` (`appTilt`) — pointer-driven 3D tilt
  via CSS transforms; respects `prefers-reduced-motion`.
- `presentation/shared/directives/reveal.directive.ts` (`appReveal`) — IntersectionObserver
  scroll-in animation, SSR-safe, with `[delay]` for stagger.
- Visual primitives (`.glass`, `.border-glow`, `.scene-3d`, `.tilt-3d`, `.layer-pop`,
  keyframe animations) and the Tailwind v4 design tokens (`@theme`) are in `src/styles.css`.
  Tailwind v4 is configured via `@import 'tailwindcss'` + `.postcssrc.json` — there is no
  `tailwind.config.js`.

## Content/data integrity

Showcased web projects and apps are **real and live**. The rule when adding/changing a
project URL: verify it returns HTTP 200 before listing it (App Store/Play Store and Netlify
links were checked this way). `public/` assets are served at the site root (e.g.
`iconUrl: 'miri-verbs-icon.png'` resolves to `/miri-verbs-icon.png`).

## Deployment

`netlify.toml` is configured (`publish = dist/dmarmijosa-portafolio/browser`, SPA redirect).
Deploy via Netlify Git integration or `netlify deploy --prod`.
