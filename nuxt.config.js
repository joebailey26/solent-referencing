export default {
  target: 'static',
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
  loading: false,
  /*
   ** Global CSS
   */
  css: [
    '@assets/css/font-loader.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
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
    ['nuxt-cookie-control', {
      colors: {
        barTextColor: 'var(--tertiaryColor)',
        barBackground: '#FFF',
        barButtonColor: '#FFF',
        barButtonHoverBackground: 'var(--secondaryColor)',
        barButtonBackground: 'var(--primaryColor)',
        modalOverlay: 'var(--tertiaryColor)',
        modalButtonBackground: 'var(--primaryColor)',
        modalButtonHoverBackground: 'var(--secondaryColor)',
        checkboxActiveBackground: 'var(--primaryColor)',
        checkboxInactiveBackground: '#d7061250',
        checkboxDisabledBackground: '#d7061299',
        checkboxActiveCircleBackground: '#FFF',
        controlButtonIconColor: 'var(--primaryColor)',
        controlButtonIconHoverColor: '#FFF',
        controlButtonHoverBackground: 'var(--primaryColor)'
      }
    }],
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/pwa'
  ],
  cookies: {
    necessary: [
      {
        name: 'Default Cookies',
        description: 'Used for cookie control (cannot be disabled).',
        cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies']
      }
    ],
    optional: [
      {
        name: 'Google Analytics',
        description: 'Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-140457046-4',
        async: true,
        cookies: ['_ga', '_gat', '_gid'],
        accepted: () => {
          window.dataLayer = window.dataLayer || []
          function gtag () {
            window.dataLayer.push(arguments)
          }
          gtag('set', 'anonymizeIp', true)
          gtag('js', new Date())
          gtag('config', 'UA-140457046-4', { anonymize_ip: true })
        },
        declined: () => {}
      }
    ]
  },
  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: false,
    mozjpeg: {
      quality: 70
    },
    pngquant: {
      stripe: true
    },
    webp: {
      quality: 70
    },
    svgo: {
      plugins: [
        { reusePaths: true },
        { removeOffCanvasPaths: true },
        { removeScriptElement: true }
      ]
    }
  },
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
