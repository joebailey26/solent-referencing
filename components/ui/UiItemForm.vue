<template>
  <form ref="citation" @submit.prevent="submit">
    <ui-input
      v-model="url"
      label="URL"
      type="url"
      required
    />
    <ui-input
      v-model="title"
      label="Title"
      type="text"
      required
    />
    <ui-input
      v-model="publisher"
      label="Publisher"
      type="text"
    />
    <ui-input
      v-model="author"
      label="Author"
      type="text"
      required
    />
    <ui-input
      v-model="description"
      label="Description"
      type="textarea"
    />
    <ui-input
      v-model="date"
      label="Date Published"
      type="date"
      required
    />
    <ui-input
      v-model="dateRetrieved"
      label="Date Retrieved"
      type="date"
      required
    />
    <button v-if="!id" type="submit">
      Add
    </button>
    <button v-else type="submit">
      Update
    </button>
    <button class="secondary" @click="cancel">
      Cancel
    </button>
  </form>
</template>

<script>
function data () {
  return {
    listId: null,
    id: null,
    url: '',
    title: '',
    publisher: '',
    author: '',
    description: '',
    date: null,
    dateRetrieved: null
  }
}
export default {
  data () {
    return data()
  },
  computed: {
    values () {
      return this.$data
    }
  },
  methods: {
    show (data) {
      this.reset()
      Object.assign(this, data)
      this.$el.querySelector('input').focus()
    },
    submit () {
      this.$emit('submit', this.values)
    },
    cancel () {
      this.$emit('cancel', this.values)
    },
    reset () {
      Object.assign(this, data())
    }
  }
}
</script>
