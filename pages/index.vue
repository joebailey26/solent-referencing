<style scoped>
  * {
    text-align: center
  }
</style>

<template>
  <div class="maxWidth">
    <h1>Welcome!</h1>
    <p>You can get started by heading to <a href="https://docs.galexia.agency">Galexia Docs</a></p>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Home',
      meta: [
        { hid: 'description', name: 'description', content: 'REPLACE' },
        { hid: 'og:title', property: 'og:title', content: 'Home' },
        { hid: 'og:description', property: 'og:description', content: 'REPLACE' },
        { hid: 'og:image', property: 'og:image', content: 'REPLACE' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Home' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'REPLACE' },
        { hid: 'twitter:img', name: 'twitter:img', content: 'REPLACE' }
      ],
      link: [
        { hid: 'canonical', rel: 'canonical', href: 'REPLACE' }
      ]
    }
  }
}
</script>
