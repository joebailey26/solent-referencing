<style>
  .login {
    max-width: 500px;
    margin: auto
  }
</style>

<template>
  <section>
    <form v-if="!signupFlow" class="login" @submit.prevent>
      <ui-input
        v-model="email"
        label="E-mail"
        required
        type="email"
      />
      <ui-input
        v-model="password"
        label="Password"
        required
        type="password"
      />
      <button @click="login">
        Login
      </button>
      <button @click="signUp">
        Sign Up
      </button>
    </form>
    <h2 v-else>
      Please check for a confirmation email
    </h2>
  </section>
</template>

<script>
export default {
  data () {
    return {
      signupFlow: false,
      email: '',
      password: ''
    }
  },
  beforeMount () {
    if (this.$store.state.loggedIn) {
      this.$router.push('citations')
    }
  },
  mounted () {
    this.$store.commit('checkLoggedIn')
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
        this.signupFlow = true
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
