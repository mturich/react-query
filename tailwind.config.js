/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         gridTemplateColumns: {
            'autofit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
            'autofit-150': 'repeat(auto-fit, minmax(150px, 1fr))',
            'autofit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
            'autofit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
            'autofit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
            'autofit-350': 'repeat(auto-fit, minmax(350px, 1fr))',
            'autofit-400': 'repeat(auto-fit, minmax(400px, 1fr))',
            'autofit-450': 'repeat(auto-fit, minmax(450px, 1fr))',
         }
      },
   },
   plugins: [],
}
