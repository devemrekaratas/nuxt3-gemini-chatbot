export default {
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
        fontFamily: {
          custom: ['Poppins'],
        }
      },
    },
    plugins: [
      // ...
      require('tailwind-scrollbar'),
  ],
  }