
<style lang="scss" scoped>
  .card {
    position: relative;
    border-radius: 3px;
    cursor: move;
    .item-title {
      max-width: 80%
    }
  }
  .icons {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: grid;
    grid-gap: .5rem;
    grid-auto-flow: column
  }
  .is-overdue {
    color: red;
    border: 1px solid red
  }
  .card:hover {
    .icon-due,
    .icon-date {
      display: none
    }
  }
  .icon-edit, .icon-date {
    color: #DDDDDD
  }
  .icon-edit {
    display: none;
    margin-right: -5px;
    .card:hover & {
      display: block
    }
  }
  i {
    font-style: normal
  }
  @media (hover: none) {
    .card {
      .icon-due,
      .icon-date {
        display: none
      }
    }
    .icon-edit {
      .card & {
        display: block
      }
    }
  }
</style>

<template>
  <div class="card" :data-id="item.id">
    <div class="icons">
      <span class="icon icon-edit" @click="quickCite">
        <font-awesome-icon icon="copy" />
      </span>
      <span class="icon icon-edit" @click="edit">
        <font-awesome-icon icon="edit" />
      </span>
      <span class="icon icon-edit" @click="remove">
        <font-awesome-icon icon="times" />
      </span>
    </div>
    <p v-if="item.title" class="item-title" v-text="item.title" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    icons: {
      type: Boolean,
      default: true
    },
    project: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState([
      'claims'
    ])
  },

  methods: {
    quickCite () {
      this.$emit('quickCite', this.item)
    },
    edit () {
      this.$emit('edit', this.item)
    },
    remove () {
      this.$emit('remove', this.item)
    }
  }
}
</script>
