export interface ProjectLink {
  readonly id: string;
  readonly label: string;
  readonly kind: 'tool';
  readonly description: string;
  readonly url: string;
  readonly preview: {
    readonly overview: string;
    readonly highlights: readonly [string, string, string];
    readonly screenshot: {
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      readonly position?: string;
    };
  };
}

export const projects = [
  {
    id: 'io',
    label: 'I/O',
    kind: 'tool',
    description: 'An interactive way to test your computer peripherals.',
    url: 'https://alwinpamintuan.github.io/io/',
    preview: {
      overview: 'A browser-based peripheral tester with a shared workstation for checking input, displays, and audio devices.',
      highlights: [
        'Keyboard and mouse input, button states, and movement.',
        'Display inspection patterns and controller buttons and axes.',
        'Webcam preview, speaker tones, and microphone input.',
      ],
      screenshot: {
        src: '/previews/io.webp',
        position: '50% 20%',
        alt: 'I/O workstation with a monitor, keyboard, mouse, controller, webcam, speakers, and microphone.',
        width: 1200,
        height: 630,
      },
    },
  },
  {
    id: 'raffler',
    label: 'Raffler',
    kind: 'tool',
    description: 'If Rappler made a raffle app.',
    url: 'https://alwinpamintuan.github.io/raffler/',
    preview: {
      overview: 'A raffle tool for building a participant pool, drawing winners, and keeping track of results.',
      highlights: [
        'Add names individually, paste a list, or import text and CSV files.',
        'Adjust ticket weights and choose how winners leave the pool.',
        'Copy or export results and manually save sessions in the browser.',
      ],
      screenshot: {
        src: '/previews/raffler.webp',
        position: '50% 0%',
        alt: 'Raffler’s live-draw screen with six sample participants, an orange Draw a winner button, and an Add names sidebar.',
        width: 1200,
        height: 630,
      },
    },
  },
] as const satisfies readonly ProjectLink[];

export const professionalHub = {
  id: 'resume',
  label: 'Résumé',
  description: 'Professional hub',
  url: 'https://alwinpamintuan.github.io/resume/',
} as const;

export const githubProfile = {
  label: 'GitHub',
  url: 'https://github.com/alwinpamintuan',
} as const;

export const identity = {
  name: 'John Alwin Pamintuan',
  email: 'alwinpamintuan@gmail.com',
} as const;

export const about = {
  heading: ['Projects.', 'Experiments.', 'Side quests.'],
  description: 'Things I make outside of work.',
  location: 'Metro Manila, Philippines',
} as const;

export const socialProfiles = [
  githubProfile,
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alwinpamintuan/' },
] as const;
