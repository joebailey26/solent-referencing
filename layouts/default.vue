
<style>
  :root {
    --primaryColor: #D70612;
    --secondaryColor: #2B3594;
    --tertiaryColor: #33373C;
    --primaryFont: bliss, calibri, trebuchet ms, sans-serif;
    --borderRadius: 0;
    --fontSize: 16px
  }
  body {
    font-family: var(--primaryFont);
    color: var(--tertiaryColor);
    line-height: 1.75;
    font-weight: 300;
    text-underline-offset: .125em;
    text-decoration-thickness: .0625em;
    overflow: hidden
  }
  :focus:not(:focus-visible) {
    outline: none
  }
  .maxWidth {
    padding: 2rem;
    max-width: min(1376px, calc(100vw - 4rem));
    margin: auto
  }
  :any-link {
    color: var(--primaryColor);
    font-weight: bold;
    text-decoration: none
  }

  /* Cookie Bar */
  .cookieControl__Bar {
    font-family: var(--primaryFont)
  }

  /* Nav */
  nav.nav {
    display: grid;
    grid-auto-flow: column
  }
  .logo--container {
    display: grid;
    align-content: center;
    justify-content: left
  }
  .logo img {
    max-width: 100px
  }
  .nav--container {
    justify-self: end;
    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: column;
    align-content: center
  }
  .nav--link {
    font-size: 1.25rem;
    padding: .5rem;
    transition: color .5s, border .5s;
    border-bottom: .15rem solid transparent;
    font-family: var(--primaryFont);
    letter-spacing: .05rem
  }
  .nav--link:hover {
    color: var(--primaryColor)
  }
  .nav--link:hover, .nav--link.nuxt-link-exact-active {
    border-bottom: .15rem solid var(--primaryColor)
  }
  .nav--icon {
    display: none
  }
  main {
    min-height: 75vh
  }
  section {
    max-width: min(1376px, calc(100vw - 4rem));
    margin: auto;
    padding: 40px 2rem
  }

  @media (max-width: 768px) {
    .maxWidth {
      padding: 1rem
    }
    .nav--icon {
      display: block;
      height: 40px;
      width: 40px;
      justify-self: end;
      align-self: center
    }
    .nav--container {
      height: 100vh;
      min-height: -webkit-fill-available;
      position: absolute;
      grid-auto-flow: row;
      left: 100vw;
      top: 0;
      bottom: 0;
      width: 200px;
      background: var(--primaryColor);
      padding: 2.5rem;
      transition: left 1s
    }
    .nav_open .nav--container {
      left: calc(100vw - 200px)
    }
    .nav_close .nav--container {
      display: none
    }
    html {
      transition: margin 1s
    }
    html.nav_open {
      margin-left: -400px;
      overflow: hidden
    }
  }
</style>

<template>
  <div :style="'--motion: ' + motion">
    <header>
      <nav class="nav maxWidth">
        <div class="logo--container">
          <nuxt-link class="logo" to="/">
            <img src="../assets/img/main-logo.png">
          </nuxt-link>
        </div>
        <div class="nav--icon">
          <div @click="nav" v-html="require('../assets/svg/menu.svg?include')" />
        </div>
        <div class="nav--container">
          <nuxt-link to="/" class="nav--link">
            Home
          </nuxt-link>
          <nuxt-link to="/citations" class="nav--link">
            My Citations
          </nuxt-link>
          <a v-if="supabaseLoggedIn" href="javascript:void(0)" class="nav--link" @click="logout">
            Log Out
          </a>
          <nuxt-link v-else to="login" class="nav--link">
            Login / Sign Up
          </nuxt-link>
        </div>
      </nav>
    </header>
    <main>
      <nuxt keep-alive />
    </main>
    <footer class="maxWidth">
      <p>© {{ new Date().getFullYear() }} Solent Referencing Application. By <a href="https://joebailey.xyz">Joe Bailey.</a></p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      motion: 'auto'
    }
  },
  computed: {
    ...mapState([
      'loggedIn'
    ]),
    ...mapGetters([
      'supabaseLoggedIn'
    ])
  },
  watch: {
    $route () {
      document.documentElement.classList.remove('nav_open')
      setTimeout(function () {
        document.documentElement.classList.add('nav_close')
      }, 1000)
    }
  },
  async mounted () {
    document.documentElement.classList.add('nav_close')
    this.motion = await window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  },
  methods: {
    nav () {
      if (document.documentElement.classList.contains('nav_open')) {
        document.documentElement.classList.remove('nav_open')
        setTimeout(function () {
          document.documentElement.classList.add('nav_close')
        }, 1000)
      } else {
        document.documentElement.classList.remove('nav_close')
        setTimeout(function () {
          document.documentElement.classList.add('nav_open')
        }, 1)
      }
    },
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>
