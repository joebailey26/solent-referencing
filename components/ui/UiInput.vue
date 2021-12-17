<template>
  <div class="field">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="control">
      <textarea
        v-if="type === 'textarea'"
        v-model.trim="input"
        :name="name"
        class="textarea"
        :class="{'is-danger': error}"
        v-bind="$attrs"
        :disabled="disabled"
      />
      <input
        v-else
        v-model.trim="input"
        :type="type"
        :name="name"
        class="input"
        :class="{'is-danger': error}"
        v-bind="$attrs"
        :disabled="disabled"
        @keydown.enter="onEnter"
      >
      <button v-if="type === 'date'" class="secondary date-clear" :disabled="disabled" @click="resetDate">
        X
      </button>
    </div>
    <p v-if="error" class="help is-danger">
      {{ error }}
    </p>
  </div>
</template>

<script>
import field from '../mixins/field'
/**
 * @emits {KeyboardEvent} enter
 */
export default {
  extends: field,
  props: {
    type: {
      type: [String, Number],
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onEnter ($event) {
      this.$emit('enter', $event)
    },
    resetDate ($event) {
      this.$emit('resetDate', $event)
    }
  }
}
</script>
