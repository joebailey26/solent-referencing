<style scoped lang="scss">
  h1, h2 {
    text-align: center;
    font-weight: normal
  }
  h1 {
    text-transform: uppercase
  }
  .search {
    margin: auto;
    margin-top: 1rem;
    display: flex;
    max-width: 500px;
    align-items: center;
    gap: 1rem;
    position: relative;
    input[type='url'] {
      font-size: 1.5rem;
      line-height: 1;
      padding: 1.5rem 5.75rem 1.5rem 1.25rem;
      box-shadow: rgb(0 0 0 / 15%) 0 .4rem .4rem 0;
      border-radius: .75rem;
      border: 3px solid transparent;
      appearance: none;
      text-align: left;
      width: 100%;
      &:focus {
        border: 3px solid var(--primaryColor)
      }
      &::placeholder {
        font-weight: bold;
        background-image: linear-gradient(90deg, rgb(237, 28, 36) 0%, rgb(219, 30, 47) 15%, rgb(170, 37, 74) 37%, rgb(94, 46, 119) 67%, rgb(43, 53, 148) 100%);
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text
      }
    }
    .svg-wrapper {
      background-color: var(--primaryColor);
      border-radius: 0 .75rem .75rem 0;
      position: absolute;
      height: 100%;
      right: 0;
      width: 4rem;
      display: flex;
      place-content: center;
      place-items: center;
      cursor: pointer;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        * {
          fill: white
        }
      }
    }
  }
</style>

<template>
  <section>
    <h1>Welcome!</h1>
    <h2>
      To get started, paste in a URL below
    </h2>
    <form class="search" @submit.prevent="$parent.$parent.search({url})">
      <input
        v-model="url"
        type="url"
        aria-label="search"
        aria-role="search"
        placeholder="Enter a URL to cite"
      >
      <button type="submit" class="svg-wrapper">
        <font-awesome-icon icon="search" />
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data () {
    return {
      url: ''
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
