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
      <v-tabs v-model="tabs" grow>
        <v-tab>Login</v-tab>
        <v-tab>Sign Up</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs" align-with-title class="login-form">
        <v-tab-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              type="email"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
            />
            <v-btn @click="login">
              Login
            </v-btn>
          </v-form>
        </v-tab-item>
        <v-tab-item>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              type="email"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
              type="password"
            />
            <v-btn @click="signUp">
              Sign Up
            </v-btn>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
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
  methods: {
    login () {
      const email = this.email
      const password = this.password
      this.$store.dispatch('supabaseLogin', { email, password })
    },
    signUp () {
      const email = this.email
      const password = this.password
      this.$store.dispatch('supabaseSignUp', { email, password })
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
