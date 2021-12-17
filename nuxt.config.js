export default {
  target: 'static',
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Solent Referencing Application',
    meta: [
      { name: 'application-name', content: 'Solent Referencing Application' },
      { name: 'msapplication-TileColor', content: '#d70612' },
      { name: 'msapplication-TileImage', content: 'https://solent-referencing.netlify.app/mstile-150x150.png?v=dLXLEPEjpj' },

      // Twitter Card data
      { hid: 'twitter:title', name: 'twitter:title', template: chunk => `${chunk} | Solent Referencing Application` },
      { hid: 'twitter:description', name: 'twitter:description' },
      { hid: 'twitter:image', name: 'twitter:image' },

      // Open Graph data
      { hid: 'og:description', property: 'og:description' },
      { hid: 'og:title', property: 'og:title', template: chunk => `${chunk} | Solent Referencing Application` },
      { hid: 'og:image', property: 'og:image' }
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: 'https://solent-referencing.netlify.app/' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: 'https://solent-referencing.netlify.app/apple-touch-icon.png?v=dLXLEPEjpj' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://solent-referencing.netlify.app/favicon-32x32.png?v=dLXLEPEjpj' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://solent-referencing.netlify.app/favicon-16x16.png?v=dLXLEPEjpj' },
      { rel: 'mask-icon', href: 'https://solent-referencing.netlify.app/safari-pinned-tab.svg?v=dLXLEPEjpj', color: '#d70612' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap' },
      { rel: 'stylesheet', media: 'print', onload: 'this.media="all"', href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap' }
    ],
    __dangerouslyDisableSanitizers: ['script', 'noscript'],
    noscript: [
      { innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" />' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'var(--secondaryColor)',
    height: '3px',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: [
    '@assets/css/font-loader.css',
    'bulma'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/board',
    '~plugins/fontAwesome.js',
    '~/plugins/persistedState.client.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],
  generate: {
    fallback: true
  },
  pwa: {
    workbox: {
      offlineAnalytics: true,
      offlinePage: '/404.html'
    },
    manifest: {
      name: 'Solent Referencing Application',
      shortName: 'Solent-Ref',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'en-GB'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  }
}
