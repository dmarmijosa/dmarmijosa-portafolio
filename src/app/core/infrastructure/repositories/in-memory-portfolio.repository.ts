import { Injectable } from '@angular/core';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository';
import {
  Certification,
  Education,
  Experience,
  MobileApp,
  Profile,
  Project,
  Recommendation,
  SkillGroup,
  Stat,
} from '../../domain/entities';
import { Locale } from '../../domain/value-objects/locale';

/** A string available in every supported locale. */
type L = Record<Locale, string>;
/** A string list available in every supported locale. */
type LList = Record<Locale, readonly string[]>;

const pick = (value: L, locale: Locale) => value[locale];
const pickList = (value: LList, locale: Locale) => value[locale];

/**
 * Static, in-memory data source and single source of truth for portfolio
 * content. Localized text is stored inline ({ es, en }) and resolved per
 * locale. Swappable for a CMS/HTTP implementation without touching the
 * domain or presentation layers.
 */
@Injectable()
export class InMemoryPortfolioRepository extends PortfolioRepository {
  // -- Profile ---------------------------------------------------------------
  private readonly profile = {
    name: 'Danny Armijos',
    photoUrl: 'danny-armijos.jpg',
    role: {
      es: 'Software Engineer · Full Stack Developer',
      en: 'Software Engineer · Full Stack Developer',
    } satisfies L,
    headline: {
      es: 'Construyo aplicaciones web y móviles escalables con Angular, NestJS y React Native.',
      en: 'I build scalable web and mobile apps with Angular, NestJS and React Native.',
    } satisfies L,
    location: {
      es: 'Ciutadella de Menorca, Islas Baleares, España',
      en: 'Ciutadella de Menorca, Balearic Islands, Spain',
    } satisfies L,
    modality: { es: 'Trabajo 100% remoto', en: '100% remote work' } satisfies L,
    summary: {
      es: 'Desarrollador Full Stack especializado en Angular, NestJS y React Native, con más de 8 años construyendo aplicaciones web y móviles escalables mediante arquitecturas modulares y eficientes. Mi enfoque se basa en Clean Code, Clean Architecture y optimización del rendimiento. He trabajado en proyectos enterprise y plataformas de micro frontends, integrando autenticación segura (JWT, OAuth), REST APIs y WebSockets, microservicios, bases de datos (MongoDB, PostgreSQL) y despliegues en producción con CI/CD en AWS, Google Cloud y DigitalOcean.',
      en: 'Full Stack developer specialized in Angular, NestJS and React Native, with 8+ years building scalable web and mobile applications through modular, efficient architectures. My approach is grounded in Clean Code, Clean Architecture and performance optimization. I have worked on enterprise projects and micro frontend platforms, integrating secure authentication (JWT, OAuth), REST APIs and WebSockets, microservices, databases (MongoDB, PostgreSQL) and production deployments with CI/CD on AWS, Google Cloud and DigitalOcean.',
    } satisfies L,
    email: 'dmarmijosa2667@gmail.com',
    website: 'https://www.danny-armijos.com',
    linkedin: 'https://www.linkedin.com/in/dmarmijosa',
    github: 'https://github.com/dmarmijosa',
    yearsExperience: 8,
    availability: {
      es: 'Abierto a nuevas oportunidades',
      en: 'Open to new opportunities',
    } satisfies L,
  };

  // -- Stats -----------------------------------------------------------------
  private readonly stats: readonly { value: string; label: L }[] = [
    { value: '8+', label: { es: 'Años de experiencia', en: 'Years of experience' } },
    { value: '40', label: { es: 'Certificaciones', en: 'Certifications' } },
    { value: '13+', label: { es: 'Proyectos en producción', en: 'Projects in production' } },
    { value: '2', label: { es: 'Apps publicadas', en: 'Published apps' } },
  ];

  // -- Skills ----------------------------------------------------------------
  private readonly skillGroups: readonly { title: L; icon: string; skills: readonly string[] }[] = [
    {
      title: { es: 'Frontend', en: 'Frontend' },
      icon: 'layout',
      skills: ['Angular (v10–v22)', 'TypeScript', 'RxJS', 'Signals', 'React', 'Tailwind CSS', 'Angular Material', 'SASS / BEM'],
    },
    {
      title: { es: 'Backend', en: 'Backend' },
      icon: 'server',
      skills: ['NestJS (v7–v11)', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Microservicios', 'Java Spring Boot'],
    },
    {
      title: { es: 'Móvil', en: 'Mobile' },
      icon: 'smartphone',
      skills: ['React Native', 'Flutter', 'Ionic', 'Android'],
    },
    {
      title: { es: 'Bases de datos', en: 'Databases' },
      icon: 'database',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
    },
    {
      title: { es: 'DevOps & Cloud', en: 'DevOps & Cloud' },
      icon: 'cloud',
      skills: ['AWS', 'Google Cloud', 'DigitalOcean', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    },
    {
      title: { es: 'Arquitectura & IA', en: 'Architecture & AI' },
      icon: 'sparkles',
      skills: ['Clean Architecture', 'Design Patterns', 'Micro Frontends', 'LangChain', 'n8n', 'MCP', 'Agentes IA'],
    },
  ];

  // -- Projects (live, every URL verified HTTP 200) --------------------------
  private readonly projects: readonly (Omit<Project, 'description'> & { description: L })[] = [
    {
      title: 'La Bella Italia',
      description: {
        es: 'Plataforma web de pizzería con sistema de pedidos y delivery online. Desplegada bajo dominio propio en Menorca.',
        en: 'Pizzeria web platform with online ordering and delivery. Deployed under its own domain in Menorca.',
      },
      url: 'https://la-bella-italia-menorca.com',
      category: 'E-commerce',
      tech: ['Angular', 'TypeScript', 'NestJS', 'Tailwind CSS'],
      featured: true,
      accent: 'from-rose-500 via-red-500 to-orange-500',
      glyph: '🍕',
    },
    {
      title: 'TesloShop',
      description: {
        es: 'E-commerce full stack con catálogo, carrito, autenticación y panel de administración. Arquitectura escalable cliente–servidor.',
        en: 'Full stack e-commerce with catalog, cart, authentication and an admin panel. Scalable client–server architecture.',
      },
      url: 'https://teslo-shop-danny.netlify.app',
      category: 'E-commerce',
      tech: ['Angular', 'NestJS', 'PostgreSQL', 'JWT'],
      featured: true,
      accent: 'from-violet-500 via-indigo-500 to-blue-500',
      glyph: '🛒',
    },
    {
      title: 'ASL Trainer',
      description: {
        es: 'Entrenador de lenguaje de señas (ASL) que reconoce gestos en tiempo real desde la cámara mediante visión por computador e IA.',
        en: 'Sign language (ASL) trainer that recognizes gestures in real time from the camera using computer vision and AI.',
      },
      url: 'https://asl-entrenador.netlify.app',
      category: 'IA',
      tech: ['Angular', 'MediaPipe', 'TensorFlow', 'TypeScript'],
      featured: true,
      accent: 'from-cyan-400 via-teal-500 to-emerald-500',
      glyph: '🤟',
    },
    {
      title: 'Pizzería La Fontana',
      description: {
        es: 'Sitio web para restaurante en Menorca con menú interactivo, presencia de marca y diseño responsive.',
        en: 'Website for a restaurant in Menorca with an interactive menu, brand presence and responsive design.',
      },
      url: 'https://la-fontana-menorca.netlify.app',
      category: 'Web App',
      tech: ['Angular', 'TypeScript', 'CSS'],
      featured: false,
      accent: 'from-amber-400 via-orange-500 to-red-500',
      glyph: '🍝',
    },
    {
      title: 'TechPro Audiòfons',
      description: {
        es: 'Landing corporativa para empresa de audífonos en Menorca: catálogo de productos, servicios y captación de clientes.',
        en: 'Corporate landing for a hearing-aid company in Menorca: product catalog, services and lead generation.',
      },
      url: 'https://techpro-danny.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'Tailwind CSS', 'SEO'],
      featured: false,
      accent: 'from-sky-400 via-blue-500 to-indigo-600',
      glyph: '🦻',
    },
    {
      title: 'Insove Medical Healthcare',
      description: {
        es: 'Landing del sector salud con foco en conversión, accesibilidad y rendimiento. Diseño profesional y moderno.',
        en: 'Healthcare landing focused on conversion, accessibility and performance. Professional, modern design.',
      },
      url: 'https://landin-page-isove.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'Tailwind CSS', 'TypeScript'],
      featured: false,
      accent: 'from-emerald-400 via-teal-500 to-cyan-600',
      glyph: '🩺',
    },
    {
      title: 'App Delivery',
      description: {
        es: 'Aplicación de delivery con flujo de pedidos, integración de pasarela de pagos y experiencia móvil cuidada.',
        en: 'Delivery app with an ordering flow, payment gateway integration and a polished mobile experience.',
      },
      url: 'https://delivery-danny.netlify.app',
      category: 'Móvil',
      tech: ['Flutter', 'Node.js', 'SQL'],
      featured: false,
      accent: 'from-fuchsia-500 via-purple-500 to-indigo-500',
      glyph: '🛵',
    },
    {
      title: 'Trello Clone',
      description: {
        es: 'Clon de Trello con tableros, listas y tarjetas arrastrables, autenticación y gestión de estado reactiva.',
        en: 'Trello clone with draggable boards, lists and cards, authentication and reactive state management.',
      },
      url: 'https://danny-armijos.com/trello-clone',
      category: 'Web App',
      tech: ['Angular', 'Tailwind CSS', 'RxJS'],
      featured: false,
      accent: 'from-blue-500 via-indigo-500 to-violet-500',
      glyph: '📋',
    },
    {
      title: 'Citas Veterinarias',
      description: {
        es: 'Aplicación para la gestión de citas médicas veterinarias: registro de pacientes, agenda y seguimiento.',
        en: 'App to manage veterinary appointments: patient records, scheduling and follow-up.',
      },
      url: 'https://danny-armijos.com/veterinaria/',
      category: 'Web App',
      tech: ['React', 'Vite', 'Tailwind CSS'],
      featured: false,
      accent: 'from-teal-400 via-cyan-500 to-blue-500',
      glyph: '🐾',
    },
    {
      title: 'Tienda de Muebles',
      description: {
        es: 'E-commerce de mobiliario con catálogo, fichas de producto y experiencia de compra responsive.',
        en: 'Furniture e-commerce with catalog, product pages and a responsive shopping experience.',
      },
      url: 'https://tienda-muebles-danny.netlify.app',
      category: 'E-commerce',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS'],
      featured: false,
      accent: 'from-amber-500 via-yellow-500 to-orange-500',
      glyph: '🛋️',
    },
    {
      title: 'Arquitectura del Bosque',
      description: {
        es: 'Landing para estudio de arquitectura con portfolio visual, animaciones y enfoque en la marca.',
        en: 'Landing for an architecture studio with a visual portfolio, animations and brand focus.',
      },
      url: 'https://arquitectura-bosque-danny.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'CSS', 'Diseño'],
      featured: false,
      accent: 'from-lime-500 via-green-500 to-emerald-600',
      glyph: '🌲',
    },
    {
      title: 'Confraternidad Carcelaria EC',
      description: {
        es: 'Portal institucional para la fundación Confraternidad Carcelaria de Ecuador: información, programas y contacto.',
        en: 'Institutional portal for the Prison Fellowship foundation of Ecuador: information, programs and contact.',
      },
      url: 'https://portal-pwcce.netlify.app',
      category: 'Web App',
      tech: ['HTML', 'CSS', 'JavaScript'],
      featured: false,
      accent: 'from-slate-400 via-blue-500 to-indigo-500',
      glyph: '🕊️',
    },
  ];

  // -- Mobile apps -----------------------------------------------------------
  private readonly mobileApps: readonly (Omit<MobileApp, 'tagline' | 'description' | 'category' | 'features'> & {
    tagline: L;
    description: L;
    category: L;
    features: LList;
  })[] = [
    {
      name: 'Miri Verbs',
      tagline: {
        es: 'Domina los verbos en inglés jugando',
        en: 'Master English verbs by playing',
      },
      description: {
        es: 'Aplicación educativa para aprender verbos en inglés de forma gamificada, del nivel A1 al C2 (CEFR). Creada junto a la educadora Teacher Miryan, con batallas en tiempo real, rachas diarias y un sistema de repaso inteligente.',
        en: 'Educational app to learn English verbs in a gamified way, from A1 to C2 (CEFR). Built together with educator Teacher Miryan, featuring real-time battles, daily streaks and a smart review system.',
      },
      iconUrl: 'miri-verbs-icon.png',
      category: { es: 'Educación', en: 'Education' },
      tech: ['Flutter', 'Dart', 'NestJS', 'WebSockets', 'Firebase'],
      features: {
        es: [
          'Ruta de aprendizaje CEFR (A1 → C2)',
          'Arena de batallas en tiempo real',
          'Rachas de estudio diario',
          'Bucle de repaso inteligente',
        ],
        en: [
          'CEFR learning path (A1 → C2)',
          'Real-time battle arena',
          'Daily study streaks',
          'Smart review loop',
        ],
      },
      appStoreUrl: 'https://apps.apple.com/us/app/miri-verbs/id6772767218',
      googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.nexacode.miriverbs',
      accent: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    },
  ];

  // -- Experience ------------------------------------------------------------
  private readonly experiences: readonly (Omit<Experience, 'role' | 'period' | 'location' | 'highlights'> & {
    role: L;
    period: L;
    location: L;
    highlights: LList;
  })[] = [
    {
      company: 'CSA Integració de Sistemes',
      role: { es: 'Desarrollador Front-End', en: 'Front-End Developer' },
      period: { es: 'Oct 2022 — Actualidad', en: 'Oct 2022 — Present' },
      location: { es: 'Barcelona, España · Remoto', en: 'Barcelona, Spain · Remote' },
      current: true,
      highlights: {
        es: [
          'Aplicaciones web con Angular bajo arquitectura de casos de uso y micro frontends.',
          'Optimización de código con TypeScript, RxJS y Signals.',
          'Autenticación / autorización e interfaces responsivas con Tailwind CSS y Angular Material.',
          'Integración de APIs REST y WebSockets con NestJS y Node.js.',
          'Despliegue en Google Cloud, AWS y DigitalOcean con CI/CD vía GitHub Actions.',
          'Mejora de SEO con prerendering y estrategias de caching.',
        ],
        en: [
          'Web applications with Angular under use-case architecture and micro frontends.',
          'Code optimization with TypeScript, RxJS and Signals.',
          'Authentication / authorization and responsive UIs with Tailwind CSS and Angular Material.',
          'REST API and WebSocket integration with NestJS and Node.js.',
          'Deployment on Google Cloud, AWS and DigitalOcean with CI/CD via GitHub Actions.',
          'SEO improvements with prerendering and caching strategies.',
        ],
      },
    },
    {
      company: 'Freelance',
      role: { es: 'Desarrollo de Proyectos', en: 'Project Development' },
      period: { es: 'May 2018 — Dic 2022', en: 'May 2018 — Dec 2022' },
      location: { es: 'Loja, Ecuador', en: 'Loja, Ecuador' },
      current: false,
      highlights: {
        es: [
          'Proyectos independientes de desarrollo web y móvil para múltiples clientes.',
          'Versatilidad y autonomía gestionando proyectos de extremo a extremo.',
        ],
        en: [
          'Independent web and mobile development projects for multiple clients.',
          'Versatility and autonomy managing projects end to end.',
        ],
      },
    },
    {
      company: 'PC Flash Technology',
      role: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
      period: { es: 'Oct 2018 — Nov 2019', en: 'Oct 2018 — Nov 2019' },
      location: { es: 'Loja, Ecuador', en: 'Loja, Ecuador' },
      current: false,
      highlights: {
        es: ['Desarrollo full stack con Express.js y otras tecnologías.'],
        en: ['Full stack development with Express.js and other technologies.'],
      },
    },
    {
      company: 'VELSYSTEM',
      role: { es: 'Desarrollador', en: 'Developer' },
      period: { es: 'Ene 2016 — Abr 2019', en: 'Jan 2016 — Apr 2019' },
      location: { es: 'Loja, Ecuador', en: 'Loja, Ecuador' },
      current: false,
      highlights: {
        es: ['Desarrollo de software empresarial con Express.js, CSS y más.'],
        en: ['Enterprise software development with Express.js, CSS and more.'],
      },
    },
  ];

  // -- Education -------------------------------------------------------------
  private readonly education: readonly { institution: string; title: L; period: string }[] = [
    {
      institution: 'Universidad Nacional de Loja',
      title: {
        es: 'Ingeniería en Sistemas · Web/Multimedia & Webmaster',
        en: 'Systems Engineering · Web/Multimedia & Webmaster',
      },
      period: '2012 — 2017',
    },
    {
      institution: 'CADIL',
      title: {
        es: 'Inglés como lengua extranjera · Nivel A2',
        en: 'English as a foreign language · Level A2',
      },
      period: '2020',
    },
  ];

  // -- Certifications --------------------------------------------------------
  private readonly certifications: readonly (Omit<Certification, 'name'> & { name: L })[] = [
    { name: { es: 'NestJS Microservices — Certificación Oficial', en: 'NestJS Microservices — Official Certification' }, issuer: 'NestJS (Oficial)', date: 'Nov 2025', key: true },
    { name: { es: 'NestJS + Microservicios: Apps escalables y modulares', en: 'NestJS + Microservices: scalable, modular apps' }, issuer: 'Udemy', date: 'Feb 2026', key: false },
    { name: { es: 'Angular: De cero a experto · Edición 2025', en: 'Angular: Zero to expert · 2025 Edition' }, issuer: 'DevTalles', date: 'Abr 2025', key: true },
    { name: { es: 'Nest: Desarrollo backend escalable con Node', en: 'Nest: Scalable backend development with Node' }, issuer: 'DevTalles', date: 'Mar 2025', key: true },
    { name: { es: 'Curso de LangChain', en: 'LangChain Course' }, issuer: 'Platzi', date: 'Ene 2026', key: true },
    { name: { es: 'Aprende Ionic 8 con proyectos prácticos', en: 'Learn Ionic 8 with hands-on projects' }, issuer: 'Udemy', date: 'Ene 2026', key: false },
    { name: { es: 'Curso de Firebase con Angular 20', en: 'Firebase with Angular 20 Course' }, issuer: 'Platzi', date: 'Ene 2026', key: false },
    { name: { es: 'Complete Prompt Engineering Practical Course (C|PEP)', en: 'Complete Prompt Engineering Practical Course (C|PEP)' }, issuer: 'RCassociats', date: 'Abr 2025', key: false },
    { name: { es: 'Understanding TypeScript', en: 'Understanding TypeScript' }, issuer: 'Udemy', date: 'May 2023', key: false },
    { name: { es: 'Angular: Aplicaciones en tiempo real (sockets y rest)', en: 'Angular: Real-time apps (sockets and rest)' }, issuer: 'Udemy', date: 'Feb 2024', key: false },
    { name: { es: 'Aspectos básicos del diseño de UX', en: 'Foundations of UX Design' }, issuer: 'Google', date: 'Abr 2023', key: false },
    { name: { es: 'Introduction to Front-End Development', en: 'Introduction to Front-End Development' }, issuer: 'Meta', date: 'Mar 2023', key: false },
  ];

  // -- Recommendations -------------------------------------------------------
  private readonly recommendations: readonly (Omit<Recommendation, 'role' | 'text'> & { role: L; text: L })[] = [
    {
      author: 'Karla Correa',
      role: {
        es: 'Project Manager / Scrum Master / Product Owner',
        en: 'Project Manager / Scrum Master / Product Owner',
      },
      text: {
        es: 'Danny es un ingeniero de software excepcional con habilidades técnicas sobresalientes. Su capacidad para colaborar en equipo y comunicar ideas complejas lo convierten en un colaborador invaluable para cualquier proyecto.',
        en: 'Danny is an exceptional software engineer with outstanding technical skills. His ability to collaborate as a team and communicate complex ideas makes him an invaluable contributor to any project.',
      },
    },
    {
      author: 'Johanna Montaño',
      role: { es: 'QA Automation / Node.js Developer', en: 'QA Automation / Node.js Developer' },
      text: {
        es: 'Danny es un excelente desarrollador web, entregando siempre un trabajo de calidad, con eficiencia y eficacia. Le encanta el trabajo en equipo, está familiarizado con metodologías ágiles y siempre piensa en dar un valor agregado.',
        en: 'Danny is an excellent web developer, always delivering quality work efficiently and effectively. He loves teamwork, is familiar with agile methodologies and always thinks about adding extra value.',
      },
    },
    {
      author: 'Diego Murquincho',
      role: { es: 'Emprendedor Digital', en: 'Digital Entrepreneur' },
      text: { es: 'Es un genio este tipo 🤝', en: 'This guy is a genius 🤝' },
    },
  ];

  // -- Port implementation ---------------------------------------------------
  getProfile(locale: Locale): Profile {
    const p = this.profile;
    return {
      name: p.name,
      photoUrl: p.photoUrl,
      role: pick(p.role, locale),
      headline: pick(p.headline, locale),
      location: pick(p.location, locale),
      modality: pick(p.modality, locale),
      summary: pick(p.summary, locale),
      email: p.email,
      website: p.website,
      linkedin: p.linkedin,
      github: p.github,
      yearsExperience: p.yearsExperience,
      availability: pick(p.availability, locale),
    };
  }

  getStats(locale: Locale): readonly Stat[] {
    return this.stats.map((s) => ({ value: s.value, label: pick(s.label, locale) }));
  }

  getSkillGroups(locale: Locale): readonly SkillGroup[] {
    return this.skillGroups.map((g) => ({
      title: pick(g.title, locale),
      icon: g.icon,
      skills: g.skills,
    }));
  }

  getProjects(locale: Locale): readonly Project[] {
    return this.projects.map((p) => ({ ...p, description: pick(p.description, locale) }));
  }

  getMobileApps(locale: Locale): readonly MobileApp[] {
    return this.mobileApps.map((a) => ({
      ...a,
      tagline: pick(a.tagline, locale),
      description: pick(a.description, locale),
      category: pick(a.category, locale),
      features: pickList(a.features, locale),
    }));
  }

  getExperiences(locale: Locale): readonly Experience[] {
    return this.experiences.map((e) => ({
      company: e.company,
      role: pick(e.role, locale),
      period: pick(e.period, locale),
      location: pick(e.location, locale),
      current: e.current,
      highlights: pickList(e.highlights, locale),
    }));
  }

  getEducation(locale: Locale): readonly Education[] {
    return this.education.map((e) => ({
      institution: e.institution,
      title: pick(e.title, locale),
      period: e.period,
    }));
  }

  getCertifications(locale: Locale): readonly Certification[] {
    return this.certifications.map((c) => ({ ...c, name: pick(c.name, locale) }));
  }

  getRecommendations(locale: Locale): readonly Recommendation[] {
    return this.recommendations.map((r) => ({
      author: r.author,
      role: pick(r.role, locale),
      text: pick(r.text, locale),
    }));
  }
}
