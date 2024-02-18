import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        container: {
            center: true,
            padding: '1.5rem',
        },
        extend: {
            fontFamily: {
                sans: ['Manrope', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                teal: {
                    ...defaultTheme.colors.teal,
                    'semi-light': '#5FD7D3',
                    'light': '#D2E8E8',
                    'xlight': '#F0F8F7',
                    'dark': '#0ABAB5',
                    DEFAULT: '#0ABAB5',
                },
                gray: {
                    ...defaultTheme.colors.gray,
                    'input-border': '#E3E3E3',
                    'light': '#989DAE',
                    DEFAULT: '#56555B',
                },
                black: {
                    ...defaultTheme.colors.black,
                    light: '#272728',
                    DEFAULT: '#000'
                },
                white: {
                    ...defaultTheme.colors.white,
                    dirty: '#E7E7E8',
                    DEFAULT: '#fff'
                },
                green: {
                    ...defaultTheme.colors.green,
                    'semi-dark': '#559B8A',
                },
            },
            transitionTimingFunction: {
                DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                DEFAULT: '300ms',
            },
            animation: {
                'slow-spin': 'slow-spin 12s infinite linear',
            },
            keyframes: {
                'slow-spin': {
                  '0%, 100%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                }
              }
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
