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
- Proyectos reales verificados en producción (todos responden HTTP 200).
- Diseño glassmorphism, gradientes animados y accesible (ARIA, contraste, foco).

## Arquitectura

```
src/app/
├── models/         # Interfaces del dominio (fuente de verdad de tipos)
├── data/           # Contenido (perfil, proyectos, experiencia, certificaciones)
├── directives/     # tilt.directive (3D), reveal.directive (scroll)
├── components/     # navbar, hero, about, skills, projects, experience,
│                   # certifications, contact, icon
└── app.ts          # Composición de secciones
```

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
