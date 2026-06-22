# Danny Armijos — Portafolio

Portafolio personal de **Danny Armijos**, Software Engineer & Full Stack Developer
(Angular · NestJS · React Native). Single-page application construida con **Angular 22**
(standalone, signals, zoneless-ready) y **Tailwind CSS v4**, con efectos 3D interactivos.

🔗 Web: https://www.danny-armijos.com · LinkedIn: https://www.linkedin.com/in/dmarmijosa

## Características

- **Hero 3D** con parallax del puntero, tarjeta con tilt 3D y badges flotantes.
- **Tarjetas con tilt 3D** (`appTilt`) en proyectos, skills, certificaciones y testimonios.
- **Animaciones de scroll** con IntersectionObserver (`appReveal`), respetando `prefers-reduced-motion`.
- **Filtro de proyectos** por categoría con `signal` + `computed`.
- **Sección de apps móviles** con mockup 3D de teléfono y badges de App Store / Google Play (Miri Verbs).
- Proyectos reales verificados en producción (todos responden HTTP 200).
- Diseño glassmorphism, gradientes animados y accesible (ARIA, contraste, foco).

## Arquitectura (Clean Architecture)

Separación por capas con dependencias apuntando siempre hacia el dominio:

```
src/app/
├── core/
│   ├── domain/                 # Capa más interna (sin dependencias de framework)
│   │   ├── entities/           # Profile, Project, MobileApp, SkillGroup, ...
│   │   └── repositories/       # PortfolioRepository (puerto abstracto)
│   ├── application/
│   │   └── use-cases/          # GetProfile, GetProjects, GetMobileApps, ...
│   └── infrastructure/
│       └── repositories/       # InMemoryPortfolioRepository (implementa el puerto)
└── presentation/
    ├── shared/                 # icon, section-heading, directivas tilt/reveal (3D)
    └── sections/               # navbar, hero, about, skills, projects, apps,
                                # experience, certifications, contact
```

- **Dependency Inversion**: la presentación depende del puerto `PortfolioRepository`,
  nunca de la implementación. El binding se hace en `app.config.ts`
  (`{ provide: PortfolioRepository, useClass: InMemoryPortfolioRepository }`).
- Cambiar a un CMS/HTTP solo requiere una nueva implementación de infraestructura,
  sin tocar dominio ni componentes.

## Desarrollo

```bash
npm install
npm start          # ng serve → http://localhost:4200
npm run build      # build de producción en dist/dmarmijosa-portafolio/browser
npm test           # tests con Vitest
```

## Despliegue (Netlify)

El repositorio incluye `netlify.toml` con el comando de build, el directorio
`dist/dmarmijosa-portafolio/browser` y el redirect SPA. Conecta el repo en Netlify
o usa `netlify deploy --prod`.

---

Stack: Angular 22 · Tailwind CSS v4 · TypeScript · Signals · CSS 3D Transforms.
