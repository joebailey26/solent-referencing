<style>
  .login {
    max-width: 500px;
    margin: auto
  }
  .login-form {
    padding: 2rem 0
  }
</style>

<template>
  <section>
    <div class="login">
      <div id="tabs" class="tabs is-toggle is-fullwidth">
        <ul>
          <li class="is-active" data-tab="1">
            <a>Login</a>
          </li>
          <li data-tab="2">
            <a>Sign Up</a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <form @submit.prevent="login">
          <ui-input
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            type="email"
          />
          <ui-input
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            type="password"
          />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      tabs: null,
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  beforeMount () {
    if (this.$store.state.loggedIn) {
      this.$router.push('citations')
    }
  },
  methods: {
    async login () {
      try {
        this.$nuxt.$loading.start()
        await this.$store.dispatch('supabaseLogin', { email: this.email, password: this.password })
        this.$nuxt.$loading.finish()
        this.$router.push('citations')
      } catch (e) {
        this.$nuxt.$loading.finish()
        const error = {}
        error.description = e
        this.$store.commit('error', error)
      }
    },
    async signUp () {
      try {
        this.$nuxt.$loading.start()
        await this.$store.dispatch('supabaseSignUp', { email: this.email, password: this.password })
        this.$nuxt.$loading.finish()
        this.$router.push('citations')
      } catch (e) {
        this.$nuxt.$loading.finish()
        const error = {}
        error.description = e
        this.$store.commit('error', error)
      }
    }
  },
  head () {
    return {
      title: 'Login / Sign Up',
      meta: [
        { hid: 'description', name: 'description', content: 'Solent Referencing Application' },
        { hid: 'og:title', property: 'og:title', content: 'Login / Sign Up' },
        { hid: 'og:description', property: 'og:description', content: 'Solent Referencing Application' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Login / Sign Up' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Solent Referencing Application' }
      ]
    }
  }
}
</script>
