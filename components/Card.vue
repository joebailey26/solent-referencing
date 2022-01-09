
<style lang="scss" scoped>
  .card {
    position: relative;
    border-radius: 3px;
    cursor: move
  }
  .icons {
    float: right;
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
    opacity: 0;
    margin-right: -5px;
    transition: opacity .25s ease-in-out;
    .card:hover & {
      opacity: 1
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
      <a href="javascript:void(0)" title="Quick Cite" class="icon icon-edit" @click="quickCite">
        <font-awesome-icon icon="copy" />
      </a>
      <a href="javascript:void(0)" title="Edit" class="icon icon-edit" @click="edit">
        <font-awesome-icon icon="edit" />
      </a>
      <a href="javascript:void(0)" title="Delete" class="icon icon-edit" @click="remove">
        <font-awesome-icon icon="times" />
      </a>
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
