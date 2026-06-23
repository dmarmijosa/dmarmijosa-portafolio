import { Locale } from '../../../core/domain/value-objects/locale';

/**
 * UI string dictionary (labels, buttons, section headings) keyed by a dotted
 * path. Content that belongs to the domain (profile, projects, etc.) is
 * localized in the repository, not here.
 */
export type UiDictionary = Record<string, string>;

export const UI_TRANSLATIONS: Record<Locale, UiDictionary> = {
  es: {
    'nav.about': 'Sobre mí',
    'nav.skills': 'Skills',
    'nav.projects': 'Proyectos',
    'nav.apps': 'Apps',
    'nav.experience': 'Experiencia',
    'nav.certs': 'Certificaciones',
    'nav.contact': 'Contacto',
    'nav.cta': 'Contáctame',
    'lang.toggle': 'EN',
    'lang.label': 'Cambiar idioma a inglés',

    'hero.greeting': 'Hola, soy',
    'hero.viewProjects': 'Ver proyectos',
    'hero.cardRole': 'Full Stack Developer',

    'about.eyebrow': '// sobre mí',
    'about.titleLead': 'Ingeniero de software,',
    'about.titleAccent': 'apasionado por el detalle',
    'about.extra':
      'Más allá del código, valoro el equilibrio vida-trabajo y disfruto del diseño gráfico, la naturaleza, la familia y la música. 40 certificaciones entre 2016 y 2026 reflejan mi compromiso con la mejora continua.',
    'about.recommendations': 'Lo que dicen de mí',

    'skills.eyebrow': '// stack tecnológico',
    'skills.titleLead': 'Tecnologías que',
    'skills.titleAccent': 'domino',

    'projects.eyebrow': '// portafolio',
    'projects.titleLead': 'Proyectos',
    'projects.titleAccent': 'en producción',
    'projects.subtitle':
      'Una selección de aplicaciones reales, todas verificadas y en línea. Haz clic para visitarlas.',
    'projects.featured': 'Destacado',
    'projects.filter.Todos': 'Todos',
    'projects.openAria': 'Abrir {title} en una pestaña nueva',

    'apps.eyebrow': '// apps móviles',
    'apps.titleLead': 'En las',
    'apps.titleAccent': 'tiendas',
    'apps.subtitle': 'Aplicaciones publicadas en App Store y Google Play.',
    'apps.appStoreTop': 'Descárgalo en el',
    'apps.appStoreBottom': 'App Store',
    'apps.googleTop': 'Disponible en',
    'apps.googleBottom': 'Google Play',

    'experience.eyebrow': '// trayectoria',
    'experience.titleLead': 'Experiencia',
    'experience.titleAccent': 'profesional',
    'experience.current': 'Actual',
    'experience.education': 'Educación',
    'experience.certsCount':
      'certificaciones obtenidas entre 2016 y 2026 — formación continua en Angular, NestJS, IA y arquitectura.',

    'certs.eyebrow': '// aprendizaje continuo',
    'certs.titleLead': 'Certificaciones',
    'certs.titleAccent': 'destacadas',
    'certs.subtitle':
      'Una muestra de las más relevantes de un total de 40 — incluyendo la certificación oficial de NestJS.',

    'contact.eyebrow': '// hablemos',
    'contact.titleLead': '¿Construimos algo',
    'contact.titleAccent': 'juntos',
    'contact.titleTrail': '?',
    'contact.subtitle':
      'Estoy abierto a nuevas oportunidades como desarrollador front-end / full stack. Escríbeme y conversemos sobre tu proyecto.',
    'contact.footer': 'Diseñado y desarrollado con Angular & Tailwind CSS.',

    'category.Web App': 'Web App',
    'category.E-commerce': 'E-commerce',
    'category.Landing': 'Landing',
    'category.IA': 'IA',
    'category.Móvil': 'Móvil',
  },
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.apps': 'Apps',
    'nav.experience': 'Experience',
    'nav.certs': 'Certifications',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in touch',
    'lang.toggle': 'ES',
    'lang.label': 'Switch language to Spanish',

    'hero.greeting': "Hi, I'm",
    'hero.viewProjects': 'View projects',
    'hero.cardRole': 'Full Stack Developer',

    'about.eyebrow': '// about me',
    'about.titleLead': 'Software engineer,',
    'about.titleAccent': 'obsessed with the details',
    'about.extra':
      'Beyond code, I value work-life balance and enjoy graphic design, nature, family and music. 40 certifications between 2016 and 2026 reflect my commitment to continuous improvement.',
    'about.recommendations': 'What people say about me',

    'skills.eyebrow': '// tech stack',
    'skills.titleLead': 'Technologies I',
    'skills.titleAccent': 'master',

    'projects.eyebrow': '// portfolio',
    'projects.titleLead': 'Projects',
    'projects.titleAccent': 'in production',
    'projects.subtitle':
      'A selection of real applications, all verified and live. Click to visit them.',
    'projects.featured': 'Featured',
    'projects.filter.Todos': 'All',
    'projects.openAria': 'Open {title} in a new tab',

    'apps.eyebrow': '// mobile apps',
    'apps.titleLead': 'On the',
    'apps.titleAccent': 'stores',
    'apps.subtitle': 'Apps published on the App Store and Google Play.',
    'apps.appStoreTop': 'Download on the',
    'apps.appStoreBottom': 'App Store',
    'apps.googleTop': 'Get it on',
    'apps.googleBottom': 'Google Play',

    'experience.eyebrow': '// career',
    'experience.titleLead': 'Professional',
    'experience.titleAccent': 'experience',
    'experience.current': 'Current',
    'experience.education': 'Education',
    'experience.certsCount':
      'certifications earned between 2016 and 2026 — continuous learning in Angular, NestJS, AI and architecture.',

    'certs.eyebrow': '// continuous learning',
    'certs.titleLead': 'Featured',
    'certs.titleAccent': 'certifications',
    'certs.subtitle':
      'A sample of the most relevant ones out of 40 total — including the official NestJS certification.',

    'contact.eyebrow': "// let's talk",
    'contact.titleLead': 'Shall we build something',
    'contact.titleAccent': 'together',
    'contact.titleTrail': '?',
    'contact.subtitle':
      "I'm open to new opportunities as a front-end / full stack developer. Drop me a line and let's talk about your project.",
    'contact.footer': 'Designed and developed with Angular & Tailwind CSS.',

    'category.Web App': 'Web App',
    'category.E-commerce': 'E-commerce',
    'category.Landing': 'Landing',
    'category.IA': 'AI',
    'category.Móvil': 'Mobile',
  },
};
