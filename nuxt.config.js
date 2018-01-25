module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-x10',
    meta: [
      { hid: 'description', name: 'description', content: 'X10 lights controller' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    {src: '~/plugins/nuxt-client-init.js', ssr: false}
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#108296' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: 'http://localhost:8000', // env: API_URL
    init (axios, ctx) {
      axios.defaults.xsrfHeaderName = 'X-CSRFToken'
      axios.defaults.xsrfCookieName = 'home_csrftoken'
    }
  },
  router: {
    base: process.env.ROUTER_BASE || '/'
  },
  manifest: {
    name: 'X10',
    nativeUI: true,
    theme_color: '#212121'
  },
  workbox: {
    runtimeCaching: [{
      urlPattern: 'https://fonts.googleapis.com/.*',
      handler: 'cacheFirst',
      method: 'GET'
    }]
  }
}
