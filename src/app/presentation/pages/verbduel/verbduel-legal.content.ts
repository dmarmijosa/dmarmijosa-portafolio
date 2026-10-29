import { Locale } from '../../../core/domain/value-objects/locale';

/** A block of a legal document. Every field except `heading` is optional. */
export interface LegalSection {
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
  readonly steps?: readonly string[];
  readonly table?: { readonly head: readonly string[]; readonly rows: readonly (readonly string[])[] };
}

export interface LegalDocument {
  readonly eyebrow: string;
  readonly titleLead: string;
  readonly titleAccent: string;
  readonly updated: string;
  readonly intro: string;
  readonly sections: readonly LegalSection[];
  readonly contactHeading: string;
  readonly contactText: string;
}

export const VERBDUEL_SUPPORT_EMAIL = 'dmarmijosa2667@gmail.com';

/**
 * Privacy policy of the VerbDuel mobile app (iOS & Android).
 * Keep in sync with PRIVACY.md in the app repository and with the
 * App Store privacy label / Google Play data safety form.
 */
export const VERBDUEL_PRIVACY: Record<Locale, LegalDocument> = {
  es: {
    eyebrow: 'VerbDuel · App móvil',
    titleLead: 'Política de',
    titleAccent: 'privacidad',
    updated: 'Última actualización: 29 de octubre de 2026',
    intro:
      'VerbDuel es una app gratuita y sin anuncios para aprender verbos en inglés por niveles (A1–C2) y retar a otras personas en duelos 1 vs 1. Esta política explica qué datos tratamos, para qué y cuáles son tus derechos.',
    sections: [
      {
        heading: 'Responsable',
        paragraphs: [
          'Danny Armijos, desarrollador independiente con residencia en Ciutadella de Menorca (España). Contacto: dmarmijosa2667@gmail.com.',
        ],
      },
      {
        heading: 'Datos que tratamos',
        table: {
          head: ['Dato', 'Para qué se usa'],
          rows: [
            ['Correo electrónico y nombre o apodo', 'Crear tu cuenta e iniciar sesión (email, Google o Apple)'],
            ['Foto de perfil (si la eliges o la aporta Google/Apple)', 'Mostrar tu avatar en amigos y duelos'],
            ['Progreso: subniveles, puntuaciones, racha y meta diaria', 'Guardar tu avance y mostrar tu progreso'],
            ['Amistades, duelos y estadísticas de partidas', 'Funcionamiento de los duelos y de la lista de amigos'],
            ['Estado de conexión (en línea, ausente, desconectado)', 'Mostrar a tus amigos si estás disponible para un duelo'],
            ['Token de notificaciones, plataforma y desfase horario del dispositivo', 'Enviar avisos de retos y recordatorios a tu hora local'],
          ],
        },
        paragraphs: [
          'No recopilamos tu ubicación, contactos, fotos de tu galería, datos de salud ni información de pago. No usamos tus datos para publicidad ni para rastrearte en otras apps o webs.',
        ],
      },
      {
        heading: 'Base legal',
        bullets: [
          'Ejecución del servicio que solicitas: cuenta, progreso, amigos y duelos.',
          'Consentimiento: notificaciones push (permiso del sistema, que puedes retirar en cualquier momento) y recordatorios de estudio (desactivables en Ajustes de la app).',
        ],
      },
      {
        heading: 'Proveedores que intervienen',
        paragraphs: ['Tratan datos únicamente por cuenta de VerbDuel y para prestar el servicio:'],
        bullets: [
          'Supabase: base de datos, autenticación y funciones del servidor, alojados en la Unión Europea (Irlanda).',
          'Google Firebase Cloud Messaging: entrega de notificaciones push.',
          'Google y Apple: solo si eliges iniciar sesión con su cuenta.',
        ],
      },
      {
        heading: 'Notificaciones y recordatorios',
        paragraphs: [
          'Te avisamos cuando alguien te reta a un duelo. Además, si tienes los recordatorios activados, recibes como máximo tres recordatorios al día (13:00, 19:00 y 22:00, hora local), que se detienen en cuanto practicas ese día. Puedes desactivarlos en la app o en los ajustes de notificaciones del móvil.',
        ],
      },
      {
        heading: 'Seguridad',
        paragraphs: [
          'Toda la comunicación viaja cifrada (HTTPS/TLS). La base de datos aplica reglas de seguridad por fila: cada persona solo puede leer y modificar sus propios datos privados, y los tokens de notificación no son visibles para otros usuarios.',
        ],
      },
      {
        heading: 'Conservación y eliminación',
        paragraphs: [
          'Conservamos tus datos mientras tengas una cuenta. Puedes eliminarla en cualquier momento desde la app (menú de perfil → Eliminar cuenta permanente): el borrado es inmediato e irreversible e incluye perfil, progreso, amistades, duelos, estadísticas y tokens. Si no puedes acceder a la app, consulta la página de eliminación de cuenta.',
        ],
      },
      {
        heading: 'Tus derechos',
        paragraphs: [
          'Puedes ejercer los derechos de acceso, rectificación, supresión, portabilidad, oposición y limitación escribiendo a dmarmijosa2667@gmail.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).',
        ],
      },
      {
        heading: 'Menores',
        paragraphs: ['VerbDuel no está dirigida a menores de 13 años y no recopilamos conscientemente datos de menores de esa edad.'],
      },
      {
        heading: 'Cambios en esta política',
        paragraphs: [
          'Si cambiamos cómo tratamos los datos, actualizaremos esta página y la fecha de arriba. Los cambios importantes se comunicarán también dentro de la app.',
        ],
      },
    ],
    contactHeading: '¿Dudas sobre tu privacidad?',
    contactText: 'Escríbeme y te respondo personalmente.',
  },
  en: {
    eyebrow: 'VerbDuel · Mobile app',
    titleLead: 'Privacy',
    titleAccent: 'policy',
    updated: 'Last updated: October 29, 2026',
    intro:
      'VerbDuel is a free, ad-free app to learn English verbs by level (A1–C2) and challenge other people in 1-vs-1 duels. This policy explains what data we process, why, and what your rights are.',
    sections: [
      {
        heading: 'Data controller',
        paragraphs: [
          'Danny Armijos, independent developer based in Ciutadella de Menorca (Spain). Contact: dmarmijosa2667@gmail.com.',
        ],
      },
      {
        heading: 'Data we process',
        table: {
          head: ['Data', 'Purpose'],
          rows: [
            ['Email address and name or nickname', 'Create your account and sign in (email, Google or Apple)'],
            ['Profile picture (if you choose one or Google/Apple provides it)', 'Show your avatar to friends and in duels'],
            ['Progress: sub-levels, scores, streak and daily goal', 'Save and show your learning progress'],
            ['Friendships, duels and match statistics', 'Run duels and your friends list'],
            ['Online status (online, away, offline)', 'Show friends whether you are available for a duel'],
            ['Device push token, platform and time-zone offset', 'Send challenge alerts and reminders at your local time'],
          ],
        },
        paragraphs: [
          'We do not collect your location, contacts, photo library, health data or payment information. We do not use your data for advertising or to track you across other apps or websites.',
        ],
      },
      {
        heading: 'Legal basis',
        bullets: [
          'Performance of the service you request: account, progress, friends and duels.',
          'Consent: push notifications (a system permission you can withdraw at any time) and study reminders (can be turned off in the app settings).',
        ],
      },
      {
        heading: 'Service providers',
        paragraphs: ['They process data only on behalf of VerbDuel and to provide the service:'],
        bullets: [
          'Supabase: database, authentication and server functions, hosted in the European Union (Ireland).',
          'Google Firebase Cloud Messaging: delivery of push notifications.',
          'Google and Apple: only if you choose to sign in with their account.',
        ],
      },
      {
        heading: 'Notifications and reminders',
        paragraphs: [
          'We notify you when someone challenges you to a duel. If reminders are enabled, you get at most three reminders a day (1 pm, 7 pm and 10 pm local time), and they stop as soon as you practise that day. You can turn them off in the app or in your phone’s notification settings.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'All communication is encrypted (HTTPS/TLS). The database enforces row-level security: each person can only read and modify their own private data, and push tokens are never visible to other users.',
        ],
      },
      {
        heading: 'Retention and deletion',
        paragraphs: [
          'We keep your data while you have an account. You can delete it at any time from the app (profile menu → Delete account permanently): deletion is immediate and irreversible and covers your profile, progress, friendships, duels, statistics and tokens. If you cannot access the app, see the account deletion page.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You can exercise your rights of access, rectification, erasure, portability, objection and restriction by writing to dmarmijosa2667@gmail.com. You may also lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['VerbDuel is not directed at children under 13 and we do not knowingly collect data from children under that age.'],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If we change how we process data, we will update this page and the date above. Significant changes will also be announced inside the app.',
        ],
      },
    ],
    contactHeading: 'Questions about your privacy?',
    contactText: 'Write to me and I will answer personally.',
  },
};

/** Account deletion instructions (required by Google Play's data safety form). */
export const VERBDUEL_DELETE_ACCOUNT: Record<Locale, LegalDocument> = {
  es: {
    eyebrow: 'VerbDuel · App móvil',
    titleLead: 'Eliminar tu',
    titleAccent: 'cuenta',
    updated: 'Última actualización: 29 de octubre de 2026',
    intro: 'Puedes eliminar tu cuenta de VerbDuel y todos sus datos cuando quieras, desde la app o por correo.',
    sections: [
      {
        heading: 'Desde la app (inmediato)',
        steps: [
          'Abre VerbDuel e inicia sesión.',
          'Toca tu foto de perfil para abrir el menú.',
          'Pulsa «Eliminar cuenta permanente» y confirma.',
        ],
        paragraphs: ['La cuenta y todos sus datos se borran en el acto. La acción no se puede deshacer.'],
      },
      {
        heading: 'Sin acceso a la app',
        paragraphs: [
          'Escribe a dmarmijosa2667@gmail.com desde el correo con el que te registraste, con el asunto «Eliminar cuenta de VerbDuel». Eliminaremos la cuenta en un plazo máximo de 7 días y te lo confirmaremos por correo.',
        ],
      },
      {
        heading: 'Qué se elimina',
        bullets: [
          'Perfil: nombre, correo electrónico y foto.',
          'Progreso, racha, meta diaria y actividad.',
          'Amistades, duelos y estadísticas de partidas.',
          'Tokens de notificación de tus dispositivos.',
        ],
        paragraphs: ['Se elimina todo lo siguiente, sin conservar ningún dato personal:'],
      },
    ],
    contactHeading: '¿Necesitas ayuda?',
    contactText: 'Escríbeme y lo resolvemos.',
  },
  en: {
    eyebrow: 'VerbDuel · Mobile app',
    titleLead: 'Delete your',
    titleAccent: 'account',
    updated: 'Last updated: October 29, 2026',
    intro: 'You can delete your VerbDuel account and all its data at any time, from the app or by email.',
    sections: [
      {
        heading: 'From the app (immediate)',
        steps: [
          'Open VerbDuel and sign in.',
          'Tap your profile picture to open the menu.',
          'Tap “Delete account permanently” and confirm.',
        ],
        paragraphs: ['Your account and all its data are deleted right away. This cannot be undone.'],
      },
      {
        heading: 'Without access to the app',
        paragraphs: [
          'Email dmarmijosa2667@gmail.com from the address you signed up with, subject “Delete my VerbDuel account”. We will delete the account within 7 days and confirm by email.',
        ],
      },
      {
        heading: 'What is deleted',
        bullets: [
          'Profile: name, email address and picture.',
          'Progress, streak, daily goal and activity.',
          'Friendships, duels and match statistics.',
          'Push tokens of your devices.',
        ],
        paragraphs: ['All of the following is deleted; we keep no personal data:'],
      },
    ],
    contactHeading: 'Need help?',
    contactText: 'Write to me and we will sort it out.',
  },
};
