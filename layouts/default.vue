
<style lang="scss">
  :root {
    --primaryColor: #D70612;
    --secondaryColor: #2B3594;
    --tertiaryColor: #33373C;
    --primaryFont: bliss, calibri, trebuchet ms, sans-serif;
    --borderRadius: 0;
    --fontSize: 16px;

    overflow: auto
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
  h1 {
    font-size: 3rem
  }
  h2 {
    font-size: 2rem
  }
  h3 {
    font-size: 1.75rem
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
    align-content: center;
    z-index: 2;
    background: white
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
    min-height: calc(100vh - 123px - 92px);
    display: flex
  }
  section {
    max-width: min(1376px, calc(100vw - 4rem));
    width: 100%;
    margin: 0 auto;
    padding: 80px 2rem 40px
  }
  .hamburger {
    /* stylelint-disable-next-line */
    display: none!important
  }

  @media (max-width: 768px) {
    main {
      min-height: calc(100vh - 91px - 60px)
    }
    .hamburger {
      /* stylelint-disable-next-line */
      transition: .5s!important;
      /* stylelint-disable-next-line */
      display: inline-block!important;
      text-align: right
    }
    .maxWidth {
      padding: 1rem 0;
      max-width: min(1376px, calc(100vw - 2rem))
    }
    section {
      padding: 80px 0 40px;
      max-width: min(1376px, calc(100vw - 2rem))
    }
    .nav--icon {
      display: block;
      height: 40px;
      width: 40px;
      justify-self: end;
      align-self: center
    }
    .nav--link {
      font-size: 1rem
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
      padding: 1rem;
      border-left: 3px solid var(--primaryColor);
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

  /* Buttons */
  button:not(.hamburger) {
    /* stylelint-disable-next-line */
    border: 0!important;
    background: linear-gradient(165deg, rgb(237, 28, 36) 0%, rgb(219, 30, 47) 15%, rgb(170, 37, 74) 37%, rgb(94, 46, 119) 67%, rgb(43, 53, 148) 100%);
    background-size: 200% 100%;
    background-position: 0% 50%;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    text-transform: none;
    border-radius: .5rem;
    padding: .5rem 1.5rem;
    box-shadow: rgb(0 0 0 / 0%) 3px 5px 16px 5px;
    transition: .5s ease-in-out;
    cursor: pointer;
    &:hover, &:focus {
      border-radius: 3.75rem;
      background-position: 100% 50%
    }
    &.date-clear, &.date-clear:hover, &.date-clear:focus {
      padding: .6rem 1rem
    }
    &.secondary {
      background: var(--secondaryColor);
      opacity: .75
    }
  }
  input[type='date'] {
    width: calc(100% - 48px)
  }
  textarea {
    max-height: 400px
  }
  input:focus, input.input:focus, textarea:focus, textarea.textarea:focus {
    outline: none;
    box-shadow: none;
    border-color: var(--primaryColor)
  }

  /* Error */
  .error {
    background-color: white;
    display: grid;
    gap: 1rem;
    padding: 30px
  }
</style>

<template>
  <div :style="'--motion: ' + motion">
    <ui-modal
      ref="modal"
      :active="error.active"
      :cancellable="1"
      @close="hideErrorModal"
    >
      <div class="error">
        <h2>Uh oh! An error has occured</h2>
        <h3>{{ error.description }}</h3>
        <!--<p>Please copy the below information so as to not lose your changes</p>
        <textarea :value="JSON.stringify(error.data)" rows="10" />-->
      </div>
    </ui-modal>
    <header>
      <nav class="nav maxWidth">
        <div class="logo--container">
          <nuxt-link class="logo" to="/">
            <img src="../assets/img/main-logo.png">
          </nuxt-link>
        </div>
        <Hamburger type="arrow" color="linear-gradient(165deg, rgb(237, 28, 36) 0%, rgb(219, 30, 47) 15%, rgb(170, 37, 74) 37%, rgb(94, 46, 119) 67%, rgb(43, 53, 148) 100%)" />
        <div class="nav--container">
          <nuxt-link to="/" class="nav--link">
            Home
          </nuxt-link>
          <nuxt-link to="/citations" class="nav--link">
            My Citations
          </nuxt-link>
          <a v-if="loggedIn" href="javascript:void(0)" class="nav--link" @click="logout">
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
      <ui-modal
        ref="modal"
        :active="citeModal"
        @close="hideCiteModal"
      >
        <ui-item-form
          ref="form"
          @submit="addCite"
          @cancel="hideCiteModal"
        />
      </ui-modal>
    </main>
    <footer class="maxWidth">
      <p>© {{ new Date().getFullYear() }} Solent Referencing Application. By <a href="https://joebailey.xyz">Joe Bailey.</a></p>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Hamburger from 'vue-hamburger/hamburger.vue'
import UiItemForm from '../components/ui/UiItemForm'

export default {
  components: {
    UiItemForm,
    Hamburger
  },
  data () {
    return {
      motion: 'auto',
      citeModal: false
    }
  },
  computed: {
    ...mapState([
      'error',
      'loggedIn'
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
  beforeMount () {
    this.$store.commit('checkLoggedIn')
  },
  async mounted () {
    document.documentElement.classList.add('nav_close')
    this.motion = await window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  },
  methods: {
    hideErrorModal () {
      const error = {}
      error.active = false
      this.$store.commit('error', error)
    },
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
      try {
        await this.$store.dispatch('supabaseLogout')
        this.$router.push('login')
      } catch (e) {
        const error = {}
        error.description = e
        this.$store.commit('error', error)
      }
    },
    async search (data) {
      let url
      try {
        url = new URL(data.url)
        const meta = await this.$axios.post(window.location.origin + '/.netlify/functions/parseURL',
          {
            url
          }
        )
        meta.data.dateRetrieved = new Date().toISOString().substr(0, 10)
        meta.data.listId = data.listId
        this.showCiteModal(meta.data)
      } catch (e) {
        const error = {}
        error.description = e
        this.$store.commit('error', error)
      }
    },
    showCiteModal (meta) {
      this.citeModal = true
      this.$nextTick(() => {
        this.$refs.form.show(meta)
      })
    },
    hideCiteModal () {
      this.citeModal = false
    },
    addCite (item) {
      this.hideCiteModal()
      try {
        if (!item.id) {
          this.$store.dispatch('addItem', item)
        } else {
          this.$store.dispatch('updateItem', item)
        }
      } catch (e) {
        const error = {}
        error.description = e
        error.data = item
        this.$store.commit('error', error)
      }
      this.$router.push('citations')
    }
  }
}
</script>
