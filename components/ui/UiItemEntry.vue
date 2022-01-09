
<style lang="scss">
  .ui-item-entry {
    margin: 5px
  }
</style>

<template>
  <div class="ui-item-entry field has-addons">
    <div class="control is-expanded">
      <input
        :value="input"
        class="input"
        :placeholder="placeholder"
        @keydown.enter="onEnter"
        @input="update($event)"
      >
    </div>
    <div v-if="icon" class="control">
      <button type="submit" class="button is-primary" :disabled="input.length === 0" @click="onClick">
        <span class="icon is-small">
          <font-awesome-icon :icon="icon" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @emits {id, text, more}   enter
 */
export default {
  props: {
    listId: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: 'angle-right'
    }
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    onEnter () {
      this.emit()
    },
    onClick () {
      this.emit()
    },
    emit () {
      if (this.input) {
        this.$emit('enter', {
          listId: this.listId,
          text: this.input
        })
        this.input = ''
      }
    },
    update (evt) {
      this.input = evt.target.value
    }
  }
}
</script>
