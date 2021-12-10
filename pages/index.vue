<style scoped>
  * {
    text-align: center
  }
</style>

<template>
  <div class="maxWidth">
    <h1>Welcome!</h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: 'Solent Referencing Application' },
        { hid: 'og:title', property: 'og:title', content: 'Home' },
        { hid: 'og:description', property: 'og:description', content: 'Solent Referencing Application' },
        { hid: 'og:image', property: 'og:image', content: 'Solent Referencing Application' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Home' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Solent Referencing Application' }
      ]
    }
  }
}
</script>
