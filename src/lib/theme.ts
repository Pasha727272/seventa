/** Seventa cold-ice theme — black stays black; accents are icy blue */
export const theme = {
  black: '#000000',
  surface: '#0a0a0a',
  surface2: '#111111',
  accent: '#7EB8DC',
  accentBright: '#A8D4EC',
  accentDeep: '#3D6F94',
  accentMuted: 'rgba(126, 184, 220, 0.12)',
  accentBorder: 'rgba(126, 184, 220, 0.35)',
  ink: '#061018',
} as const

export const accent = {
  text: 'text-[#7EB8DC]',
  textBright: 'text-[#A8D4EC]',
  bg: 'bg-[#7EB8DC]',
  bgSoft: 'bg-[#7EB8DC]/15',
  bgMute: 'bg-[#7EB8DC]/10',
  border: 'border-[#7EB8DC]/35',
  borderSoft: 'border-[#7EB8DC]/25',
  ring: 'ring-[#7EB8DC]/30',
  hoverBorder: 'hover:border-[#7EB8DC]/40',
  focus: 'focus:border-[#7EB8DC]/50',
  shadow: 'shadow-[0_0_40px_rgba(126,184,220,0.22)]',
  from: 'from-[#7EB8DC]/10',
} as const
