import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        'components/**/*.{vue,js,ts}',
        'layouts/**/*.vue',
        'pages/**/*.vue',
        'composables/**/*.{js,ts}',
        'plugins/**/*.{js,ts}',
        'App.{js,ts,vue}',
        'app.{js,ts,vue}',
        'Error.{js,ts,vue}',
        'error.{js,ts,vue}',
        'content/**/*.md'
    ],
    theme: {
        extend: {
            colors: {
                // Custom dark theme colors based on screenshots
                dark: {
                    bg: '#050a14', // Deep dark blue background
                    card: '#0f172a', // Slightly lighter for cards
                    border: '#1e293b', // Border color
                },
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e', // Green 500
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                accent: {
                    green: '#34d399', // Emeraldish
                }
            },
            fontFamily: {
                arabic: ['Amiri', 'serif'],
                sans: ['Inter', 'sans-serif'],
            }
        }
    },
    plugins: [],
    darkMode: 'class'
}
