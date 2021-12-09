export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | REPLACE',
    meta: [
      { name: 'application-name', content: 'REPLACE' },
      { name: 'msapplication-TileColor', content: 'REPLACE' },
      { name: 'msapplication-TileImage', content: 'https://REPLACE/mstile-144x144.png?v=dLXLEPEjpj' },

      // Twitter Card data
      { hid: 'twitter:title', name: 'twitter:title', template: chunk => `${chunk} | REPLACE` },
      { hid: 'twitter:description', name: 'twitter:description' },
      { hid: 'twitter:image', name: 'twitter:image' },

      // Open Graph data
      { hid: 'og:description', property: 'og:description' },
      { hid: 'og:title', property: 'og:title', template: chunk => `${chunk} | REPLACE` },
      { hid: 'og:image', property: 'og:image' }
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: 'https://REPLACE/' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: 'https://REPLACE/apple-touch-icon-60x60.png?v=dLXLEPEjpj' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: 'https://REPLACE/apple-touch-icon-76x76.png?v=dLXLEPEjpj' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: 'https://REPLACE/apple-touch-icon-120x120.png?v=dLXLEPEjpj' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: 'https://REPLACE/apple-touch-icon-152x152.png?v=dLXLEPEjpj' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://REPLACE/apple-touch-icon-180x180.png?v=dLXLEPEjpj' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'https://REPLACE/favicon-192x192.png?v=dLXLEPEjpj' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://REPLACE/favicon-32x32.png?v=dLXLEPEjpj' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://REPLACE/favicon-16x16.png?v=dLXLEPEjpj' },
      { rel: 'mask-icon', href: 'https://REPLACE/safari-pinned-tab.svg?v=dLXLEPEjpj', color: 'REPLACE' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'preload', as: 'style', href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap' },
      { rel: 'stylesheet', media: 'print', onload: 'this.media="all"', href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap' }
    ],
    __dangerouslyDisableSanitizers: ['script', 'noscript'],
    noscript: [
      { innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400&family=Montserrat:ital,wght@0,600;0,700;1,600;1,700&family=Open+Sans:ital,wght@0,400;0,600;1,400;1,600&display=swap" />' }
    ],
    script: [
      {
        innerHTML: `{ 
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "REPLACE",
          "legalName" : "REPLACE",
          "foundingDate": "REPLACE",
          "founder": {
            "@type": "Person",
            "name": "REPLACE"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Enquiries",
            "email": "REPLACE"
          },
          "logo": "https://REPLACE/icon.png",
          "url": "https://REPLACE",
          "sameAs": [
            "https://www.linkedin.com/company/REPLACE",
            "https://www.twitter.com/REPLACE",
            "https://www.instagram.com/REPLACE",
            "https://fb.me/REPLACE"
          ]
        }`,
        type: 'application/ld+json'
      }
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
        barTextColor: '#212121',
        barBackground: '#FFF',
        barButtonColor: '#FFF',
        barButtonHoverBackground: '#1C2AB1',
        barButtonBackground: '#1a237e',
        modalOverlay: '#212121',
        modalButtonBackground: '#1a237e',
        modalButtonHoverBackground: '#1C2AB1',
        checkboxActiveBackground: '#1a237e',
        checkboxInactiveBackground: '#1a237e50',
        checkboxDisabledBackground: '#1a237e99',
        checkboxActiveCircleBackground: '#FFFFFF',
        controlButtonIconColor: '#1a237e',
        controlButtonIconHoverColor: '#fff',
        controlButtonHoverBackground: '#1a237e'
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
      offlinePage: '/404.html',
    },
    manifest: {
      name: 'REPLACE',
      shortName: 'REPLACE',
      background_color: '#REPLACE',
      display: 'standalone',
      lang: 'en-GB'
    },
    meta: {
      name: 'REPLACE',
      mobileAppIOS: true,
      theme_color: '#REPLACE',
      lang: 'en-GB',
      ogHost: 'REPLACE',
      twitterCard: 'summary_large_image',
      twitterSite: '@REPLACE'
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
