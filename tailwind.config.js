/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // 匹配所有可能的文件類型
    './index.html',
  ],
  theme: {
    extend: {
      colors:{
        'color1' : '#aa8670',
      },
    },
    fontFamily: {
      'chat': ['Noto Sans Mono', 'Noto Sans TC'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

