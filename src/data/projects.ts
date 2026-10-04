export interface ProjectLink {
  readonly id: string;
  readonly label: string;
  readonly kind: 'tool';
  readonly description: string;
  readonly url: string;
}

export const projects = [
  {
    id: 'io',
    label: 'IO',
    kind: 'tool',
    description: 'Peripheral testing',
    url: 'https://alwinpamintuan.github.io/io/',
  },
  {
    id: 'raffler',
    label: 'Raffler',
    kind: 'tool',
    description: 'Raffle draws',
    url: 'https://alwinpamintuan.github.io/raffler/',
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
