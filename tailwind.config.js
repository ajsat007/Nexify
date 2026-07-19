/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1720px',
    },
    extend: {
      // ── Premium Color Palette ──
      colors: {
        // Primary: Vivid blue → violet gradient
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          450: '#6C6FF7',
          500: '#6366F1',
          550: '#5457E7',
          600: '#4F46E5',
          650: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          850: '#1E1B4B',
          900: '#13113C',
          950: '#0B0A2E',
        },
        // Accent: Electric cyan → teal
        accent: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
          950: '#083344',
        },
        // Surface: Deep neutral with better dark mode
        surface: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          150: '#EDEDEF',
          200: '#E4E4E7',
          250: '#D4D4D8',
          300: '#A1A1AA',
          400: '#87878F',
          500: '#6B6B73',
          600: '#52525B',
          650: '#3F3F46',
          700: '#2D2D35',
          750: '#27272A',
          800: '#1F1F23',
          850: '#18181B',
          900: '#121215',
          925: '#0E0E10',
          950: '#09090B',
          975: '#050505',
        },
        success: '#10B981',
        'success-dark': '#059669',
        warning: '#F59E0B',
        'warning-dark': '#D97706',
        error: '#EF4444',
        'error-dark': '#DC2626',
        info: '#06B6D4',
      },

      // ── Font System ──
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.9375rem' }],
        xs: ['0.75rem', { lineHeight: '1.125rem' }],
        sm: ['0.875rem', { lineHeight: '1.375rem' }],
        base: ['1rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['2rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.5rem', { lineHeight: '3rem' }],
        '5xl': ['3.25rem', { lineHeight: '3.75rem' }],
        '6xl': ['4rem', { lineHeight: '4.5rem' }],
        '7xl': ['5rem', { lineHeight: '5.5rem' }],
        '8xl': ['6.5rem', { lineHeight: '7rem' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      // ── Premium Animation System ──
      animation: {
        // Entrances
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-fast': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-sm': 'slideUpSm 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-out': 'scaleOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',

        // Continuous
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'gradient-y': 'gradientY 8s ease infinite',
        blob: 'blob 7s infinite',
        'blob-fast': 'blob 4s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 15s linear infinite',

        // Micro-interactions
        'bounce-gentle': 'bounceGentle 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'spring 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'drip': 'drip 1.2s ease-in-out infinite',
        'ripple': 'ripple 1s cubic-bezier(0, 0, 0.2, 1)',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',

        // UI specific
        'sidebar-in': 'sidebarIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'sidebar-out': 'sidebarOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'toast-in': 'toastIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'toast-out': 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'modal-in': 'modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'modal-overlay': 'fadeIn 0.2s ease-out forwards',
        'dropdown-in': 'dropdownIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'typing': 'typing 1.4s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideUpSm: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-8px)' },
          '75%': { transform: 'translateY(4px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '20%': { transform: 'translate(20px, -40px) scale(1.05)' },
          '40%': { transform: 'translate(-30px, 10px) scale(0.95)' },
          '60%': { transform: 'translate(15px, 25px) scale(1.02)' },
          '80%': { transform: 'translate(-10px, -15px) scale(0.98)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        spring: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
        drip: {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '30%': { opacity: '1', transform: 'translateY(0)' },
          '60%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(100%)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        sidebarIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        sidebarOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        toastIn: {
          '0%': { transform: 'translateY(100%) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        toastOut: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(100%) scale(0.9)', opacity: '0' },
        },
        modalIn: {
          '0%': { transform: 'scale(0.95) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        dropdownIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-4px)' },
        },
      },

      // ── Glass & Blur Tokens ──
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 0 0 1px rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)',
        'glass-lg': '0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.05), 0 16px 48px rgba(0,0,0,0.1)',
        'glass-xl': '0 0 0 1px rgba(255,255,255,0.08), 0 4px 8px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.12)',
        'card': '0 0 0 1px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 0 0 1px rgba(99,102,241,0.1), 0 2px 8px rgba(99,102,241,0.08), 0 12px 40px rgba(99,102,241,0.08)',
        'elevated': '0 0 0 1px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.08)',
        'modal': '0 0 0 1px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.12), 0 48px 96px rgba(0,0,0,0.16)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.06)',
        'inner-glow-lg': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },

      // ── Border Radius ──
      borderRadius: {
        xs: '0.375rem',
        sm: '0.5rem',
        md: '0.625rem',
        DEFAULT: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },

      // ── Spacing ──
      spacing: {
        18: '4.5rem',
        88: '22rem',
        100: '25rem',
        120: '30rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },

      // ── Container ──
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },

      // ── Z-Index Scale ──
      zIndex: {
        header: '50',
        mega: '60',
        sidebar: '40',
        modal: '70',
        toast: '80',
        tooltip: '90',
        chatbot: '100',
      },

      // ── Backgrounds ──
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'grid-white': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/svg%3E\")",
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(0,0,0,0.03)' stroke-width='1'/%3E%3C/svg%3E\")",
        'radial-primary': 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
        'radial-accent': 'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 70%)',
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
        'gradient-warm': 'linear-gradient(135deg, #6366F1 0%, #A78BFA 50%, #F472B6 100%)',
        'gradient-cool': 'linear-gradient(135deg, #0EA5E9 0%, #6366F1 50%, #8B5CF6 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #0F172A 0%, #1E40AF 30%, #6366F1 60%, #7C3AED 80%, #0F172A 100%)',
      },
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
        '400%': '400% 400%',
      },
    },
  },
  plugins: [],
}
