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
                    'light': '#D2E8E8',
                    'xlight': '#F0F8F7',
                    'dark': '#0ABAB5',
                    DEFAULT: '#0ABAB5',
                },
                gray: {
                    ...defaultTheme.colors.gray,
                    DEFAULT: '#56555B',
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
