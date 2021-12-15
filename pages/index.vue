<style scoped>
  * {
    text-align: center
  }
</style>

<template>
  <div class="maxWidth">
    <h1>Welcome!</h1>
    <v-form v-model="valid" @submit.prevent="search">
      <v-text-field v-model="url" type="url" placeholder="Enter a URL to cite" />
      <v-btn @click="search">
        Search
      </v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      url: '',
      valid: false
    }
  },
  methods: {
    async search () {
      const meta = await this.$axios.post(window.location.origin + '/.netlify/functions/parseURL',
        {
          url: this.url
        }
      )
      console.log(meta)
    }
  },
  head () {
    return {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: 'Solent Referencing Application' },
        { hid: 'og:title', property: 'og:title', content: 'Home' },
        { hid: 'og:description', property: 'og:description', content: 'Solent Referencing Application' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Home' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Solent Referencing Application' }
      ]
    }
  }
}
</script>
