/** Tokens del sistema "Taller" (DESIGN.md §5) mapeados a variables CSS. */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { sm: '640px', md: '834px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      bg: 'var(--bg)',
      surface: 'var(--surface)',
      'surface-2': 'var(--surface-2)',
      line: 'var(--line)',
      text: 'var(--text)',
      muted: 'var(--text-muted)',
      accent: 'var(--accent)',
      'accent-soft': 'var(--accent-soft)',
      cool: 'var(--cool)',
      ok: 'var(--ok)',
      error: 'var(--error)',
    },
    fontFamily: {
      display: ['Fraunces', 'Georgia', 'serif'],
      sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
    },
    fontSize: {
      display: ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
      h1: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
      h2: ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      h3: ['clamp(1.375rem, 2.2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      lead: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.5' }],
      body: ['1rem', { lineHeight: '1.6' }],
      small: ['0.875rem', { lineHeight: '1.5' }],
      label: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
    },
    spacing: {
      0: '0', px: '1px', 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px',
      12: '48px', 16: '64px', 24: '96px', 32: '128px', 48: '192px',
      margen: 'var(--margen)',
    },
    borderRadius: { none: '0', tag: '2px', input: '6px', panel: '12px', pill: '999px', full: '9999px' },
    extend: {
      maxWidth: { sitio: '1440px', texto: '680px' },
      transitionTimingFunction: { out: 'var(--ease-out)', inout: 'var(--ease-inout)', in: 'var(--ease-in)' },
      transitionDuration: { xs: '150ms', sm: '250ms', md: '450ms', lg: '700ms', xl: '1400ms' },
      zIndex: { contenido: '10', canvas: '20', cursor: '40', nav: '50', detalle: '80', progreso: '90' },
      boxShadow: { montaje: '0 0 0 1px var(--line), var(--sombra-montaje)' },
    },
  },
  plugins: [],
};
