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

/**
 * Static, in-memory data source. The single source of truth for portfolio
 * content. Swappable for a CMS/HTTP implementation without touching the
 * domain or presentation layers.
 */
@Injectable()
export class InMemoryPortfolioRepository extends PortfolioRepository {
  private readonly profile: Profile = {
    name: 'Danny Armijos',
    role: 'Software Engineer · Full Stack Developer',
    headline:
      'Construyo aplicaciones web y móviles escalables con Angular, NestJS y React Native.',
    location: 'Ciutadella de Menorca, Islas Baleares, España',
    modality: 'Trabajo 100% remoto',
    summary:
      'Desarrollador Full Stack especializado en Angular, NestJS y React Native, con más de 8 años construyendo aplicaciones web y móviles escalables mediante arquitecturas modulares y eficientes. Mi enfoque se basa en Clean Code, Clean Architecture y optimización del rendimiento. He trabajado en proyectos enterprise y plataformas de micro frontends, integrando autenticación segura (JWT, OAuth), REST APIs y WebSockets, microservicios, bases de datos (MongoDB, PostgreSQL) y despliegues en producción con CI/CD en AWS, Google Cloud y DigitalOcean.',
    email: 'dmarmijosa2667@gmail.com',
    website: 'https://www.danny-armijos.com',
    linkedin: 'https://www.linkedin.com/in/dmarmijosa',
    github: 'https://github.com/dmarmijosa',
    yearsExperience: 8,
    availability: 'Abierto a nuevas oportunidades',
  };

  private readonly stats: readonly Stat[] = [
    { value: '8+', label: 'Años de experiencia' },
    { value: '40', label: 'Certificaciones' },
    { value: '13+', label: 'Proyectos en producción' },
    { value: '2', label: 'Apps publicadas' },
  ];

  private readonly skillGroups: readonly SkillGroup[] = [
    {
      title: 'Frontend',
      icon: 'layout',
      skills: ['Angular (v10–v22)', 'TypeScript', 'RxJS', 'Signals', 'React', 'Tailwind CSS', 'Angular Material', 'SASS / BEM'],
    },
    {
      title: 'Backend',
      icon: 'server',
      skills: ['NestJS (v7–v11)', 'Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Microservicios', 'Java Spring Boot'],
    },
    {
      title: 'Móvil',
      icon: 'smartphone',
      skills: ['React Native', 'Flutter', 'Ionic', 'Android'],
    },
    {
      title: 'Bases de datos',
      icon: 'database',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
    },
    {
      title: 'DevOps & Cloud',
      icon: 'cloud',
      skills: ['AWS', 'Google Cloud', 'DigitalOcean', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    },
    {
      title: 'Arquitectura & IA',
      icon: 'sparkles',
      skills: ['Clean Architecture', 'Design Patterns', 'Micro Frontends', 'LangChain', 'n8n', 'MCP', 'Agentes IA'],
    },
  ];

  /** Live web projects — every URL verified HTTP 200. Featured first. */
  private readonly projects: readonly Project[] = [
    {
      title: 'La Bella Italia',
      description:
        'Plataforma web de pizzería con sistema de pedidos y delivery online. Desplegada bajo dominio propio en Menorca.',
      url: 'https://la-bella-italia-menorca.com',
      category: 'E-commerce',
      tech: ['Angular', 'TypeScript', 'NestJS', 'Tailwind CSS'],
      featured: true,
      accent: 'from-rose-500 via-red-500 to-orange-500',
      glyph: '🍕',
    },
    {
      title: 'TesloShop',
      description:
        'E-commerce full stack con catálogo, carrito, autenticación y panel de administración. Arquitectura escalable cliente–servidor.',
      url: 'https://teslo-shop-danny.netlify.app',
      category: 'E-commerce',
      tech: ['Angular', 'NestJS', 'PostgreSQL', 'JWT'],
      featured: true,
      accent: 'from-violet-500 via-indigo-500 to-blue-500',
      glyph: '🛒',
    },
    {
      title: 'ASL Trainer',
      description:
        'Entrenador de lenguaje de señas (ASL) que reconoce gestos en tiempo real desde la cámara mediante visión por computador e IA.',
      url: 'https://asl-entrenador.netlify.app',
      category: 'IA',
      tech: ['Angular', 'MediaPipe', 'TensorFlow', 'TypeScript'],
      featured: true,
      accent: 'from-cyan-400 via-teal-500 to-emerald-500',
      glyph: '🤟',
    },
    {
      title: 'Pizzería La Fontana',
      description:
        'Sitio web para restaurante en Menorca con menú interactivo, presencia de marca y diseño responsive.',
      url: 'https://la-fontana-menorca.netlify.app',
      category: 'Web App',
      tech: ['Angular', 'TypeScript', 'CSS'],
      featured: false,
      accent: 'from-amber-400 via-orange-500 to-red-500',
      glyph: '🍝',
    },
    {
      title: 'TechPro Audiòfons',
      description:
        'Landing corporativa para empresa de audífonos en Menorca: catálogo de productos, servicios y captación de clientes.',
      url: 'https://techpro-danny.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'Tailwind CSS', 'SEO'],
      featured: false,
      accent: 'from-sky-400 via-blue-500 to-indigo-600',
      glyph: '🦻',
    },
    {
      title: 'Insove Medical Healthcare',
      description:
        'Landing del sector salud con foco en conversión, accesibilidad y rendimiento. Diseño profesional y moderno.',
      url: 'https://landin-page-isove.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'Tailwind CSS', 'TypeScript'],
      featured: false,
      accent: 'from-emerald-400 via-teal-500 to-cyan-600',
      glyph: '🩺',
    },
    {
      title: 'App Delivery',
      description:
        'Aplicación de delivery con flujo de pedidos, integración de pasarela de pagos y experiencia móvil cuidada.',
      url: 'https://delivery-danny.netlify.app',
      category: 'Móvil',
      tech: ['Flutter', 'Node.js', 'SQL'],
      featured: false,
      accent: 'from-fuchsia-500 via-purple-500 to-indigo-500',
      glyph: '🛵',
    },
    {
      title: 'Trello Clone',
      description:
        'Clon de Trello con tableros, listas y tarjetas arrastrables, autenticación y gestión de estado reactiva.',
      url: 'https://danny-armijos.com/trello-clone',
      category: 'Web App',
      tech: ['Angular', 'Tailwind CSS', 'RxJS'],
      featured: false,
      accent: 'from-blue-500 via-indigo-500 to-violet-500',
      glyph: '📋',
    },
    {
      title: 'Citas Veterinarias',
      description:
        'Aplicación para la gestión de citas médicas veterinarias: registro de pacientes, agenda y seguimiento.',
      url: 'https://danny-armijos.com/veterinaria/',
      category: 'Web App',
      tech: ['React', 'Vite', 'Tailwind CSS'],
      featured: false,
      accent: 'from-teal-400 via-cyan-500 to-blue-500',
      glyph: '🐾',
    },
    {
      title: 'Tienda de Muebles',
      description:
        'E-commerce de mobiliario con catálogo, fichas de producto y experiencia de compra responsive.',
      url: 'https://tienda-muebles-danny.netlify.app',
      category: 'E-commerce',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS'],
      featured: false,
      accent: 'from-amber-500 via-yellow-500 to-orange-500',
      glyph: '🛋️',
    },
    {
      title: 'Arquitectura del Bosque',
      description:
        'Landing para estudio de arquitectura con portfolio visual, animaciones y enfoque en la marca.',
      url: 'https://arquitectura-bosque-danny.netlify.app',
      category: 'Landing',
      tech: ['Angular', 'CSS', 'Diseño'],
      featured: false,
      accent: 'from-lime-500 via-green-500 to-emerald-600',
      glyph: '🌲',
    },
    {
      title: 'Confraternidad Carcelaria EC',
      description:
        'Portal institucional para la fundación Confraternidad Carcelaria de Ecuador: información, programas y contacto.',
      url: 'https://portal-pwcce.netlify.app',
      category: 'Web App',
      tech: ['HTML', 'CSS', 'JavaScript'],
      featured: false,
      accent: 'from-slate-400 via-blue-500 to-indigo-500',
      glyph: '🕊️',
    },
  ];

  /** Published mobile apps. */
  private readonly mobileApps: readonly MobileApp[] = [
    {
      name: 'Miri Verbs',
      tagline: 'Domina los verbos en inglés jugando',
      description:
        'Aplicación educativa para aprender verbos en inglés de forma gamificada, del nivel A1 al C2 (CEFR). Creada junto a la educadora Teacher Miryan, con batallas en tiempo real, rachas diarias y un sistema de repaso inteligente.',
      iconUrl: 'miri-verbs-icon.png',
      category: 'Educación',
      tech: ['Flutter', 'Dart', 'NestJS', 'WebSockets', 'Firebase'],
      features: [
        'Ruta de aprendizaje CEFR (A1 → C2)',
        'Arena de batallas en tiempo real',
        'Rachas de estudio diario',
        'Bucle de repaso inteligente',
      ],
      appStoreUrl: 'https://apps.apple.com/us/app/miri-verbs/id6772767218',
      googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.nexacode.miriverbs',
      accent: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    },
  ];

  private readonly experiences: readonly Experience[] = [
    {
      company: 'CSA Integració de Sistemes',
      role: 'Desarrollador Front-End',
      period: 'Oct 2022 — Actualidad',
      location: 'Barcelona, España · Remoto',
      current: true,
      highlights: [
        'Aplicaciones web con Angular bajo arquitectura de casos de uso y micro frontends.',
        'Optimización de código con TypeScript, RxJS y Signals.',
        'Autenticación / autorización e interfaces responsivas con Tailwind CSS y Angular Material.',
        'Integración de APIs REST y WebSockets con NestJS y Node.js.',
        'Despliegue en Google Cloud, AWS y DigitalOcean con CI/CD vía GitHub Actions.',
        'Mejora de SEO con prerendering y estrategias de caching.',
      ],
    },
    {
      company: 'Freelance',
      role: 'Desarrollo de Proyectos',
      period: 'May 2018 — Dic 2022',
      location: 'Loja, Ecuador',
      current: false,
      highlights: [
        'Proyectos independientes de desarrollo web y móvil para múltiples clientes.',
        'Versatilidad y autonomía gestionando proyectos de extremo a extremo.',
      ],
    },
    {
      company: 'PC Flash Technology',
      role: 'Desarrollador Full Stack',
      period: 'Oct 2018 — Nov 2019',
      location: 'Loja, Ecuador',
      current: false,
      highlights: ['Desarrollo full stack con Express.js y otras tecnologías.'],
    },
    {
      company: 'VELSYSTEM',
      role: 'Desarrollador',
      period: 'Ene 2016 — Abr 2019',
      location: 'Loja, Ecuador',
      current: false,
      highlights: ['Desarrollo de software empresarial con Express.js, CSS y más.'],
    },
  ];

  private readonly education: readonly Education[] = [
    {
      institution: 'Universidad Nacional de Loja',
      title: 'Ingeniería en Sistemas · Web/Multimedia & Webmaster',
      period: '2012 — 2017',
    },
    {
      institution: 'CADIL',
      title: 'Inglés como lengua extranjera · Nivel A2',
      period: '2020',
    },
  ];

  private readonly certifications: readonly Certification[] = [
    { name: 'NestJS Microservices — Official Certification', issuer: 'NestJS (Oficial)', date: 'Nov 2025', key: true },
    { name: 'NestJS + Microservicios: Apps escalables y modulares', issuer: 'Udemy', date: 'Feb 2026', key: false },
    { name: 'Angular: De cero a experto · Edición 2025', issuer: 'DevTalles', date: 'Abr 2025', key: true },
    { name: 'Nest: Desarrollo backend escalable con Node', issuer: 'DevTalles', date: 'Mar 2025', key: true },
    { name: 'Curso de LangChain', issuer: 'Platzi', date: 'Ene 2026', key: true },
    { name: 'Aprende Ionic 8 con proyectos prácticos', issuer: 'Udemy', date: 'Ene 2026', key: false },
    { name: 'Curso de Firebase con Angular 20', issuer: 'Platzi', date: 'Ene 2026', key: false },
    { name: 'Complete Prompt Engineering Practical Course (C|PEP)', issuer: 'RCassociats', date: 'Abr 2025', key: false },
    { name: 'Understanding TypeScript', issuer: 'Udemy', date: 'May 2023', key: false },
    { name: 'Angular: Aplicaciones en tiempo real (sockets y rest)', issuer: 'Udemy', date: 'Feb 2024', key: false },
    { name: 'Aspectos básicos del diseño de UX', issuer: 'Google', date: 'Abr 2023', key: false },
    { name: 'Introduction to Front-End Development', issuer: 'Meta', date: 'Mar 2023', key: false },
  ];

  private readonly recommendations: readonly Recommendation[] = [
    {
      author: 'Karla Correa',
      role: 'Project Manager / Scrum Master / Product Owner',
      text: 'Danny es un ingeniero de software excepcional con habilidades técnicas sobresalientes. Su capacidad para colaborar en equipo y comunicar ideas complejas lo convierten en un colaborador invaluable para cualquier proyecto.',
    },
    {
      author: 'Johanna Montaño',
      role: 'QA Automation / Node.js Developer',
      text: 'Danny es un excelente desarrollador web, entregando siempre un trabajo de calidad, con eficiencia y eficacia. Le encanta el trabajo en equipo, está familiarizado con metodologías ágiles y siempre piensa en dar un valor agregado.',
    },
    {
      author: 'Diego Murquincho',
      role: 'Emprendedor Digital',
      text: 'Es un genio este tipo 🤝',
    },
  ];

  getProfile(): Profile {
    return this.profile;
  }
  getStats(): readonly Stat[] {
    return this.stats;
  }
  getSkillGroups(): readonly SkillGroup[] {
    return this.skillGroups;
  }
  getProjects(): readonly Project[] {
    return this.projects;
  }
  getMobileApps(): readonly MobileApp[] {
    return this.mobileApps;
  }
  getExperiences(): readonly Experience[] {
    return this.experiences;
  }
  getEducation(): readonly Education[] {
    return this.education;
  }
  getCertifications(): readonly Certification[] {
    return this.certifications;
  }
  getRecommendations(): readonly Recommendation[] {
    return this.recommendations;
  }
}
