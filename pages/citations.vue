<style lang="scss">
  .board-container {
    position: relative;
    overflow-x: auto
  }
  $column-width: 320px;
  .smooth-dnd-draggable-wrapper .list-container {
    padding-bottom: 0
  }
  .list-container {
    width: $column-width;
    max-width: calc(100vw - 3rem);
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: rgb(232, 237, 237);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .24);
    max-height: 80vh;
    overflow: auto;
    > .item-entry {
      background-color: rgb(232, 237, 237);
      padding-bottom: 10px;
      position: sticky;
      bottom: 0
    }
  }
  .lists-container {
    > * {
      display: inline-block;
      vertical-align: top
    }
  }
  .list-header {
    padding-bottom: 5px;
    padding-top: 10px;
    margin-top: -10px;
    font-size: 18px;
    position: sticky;
    top: -10px;
    z-index: 1;
    background: rgb(232, 237, 237)
  }
  .list-header .list-delete {
    display: none
  }
  .list-header:hover .list-delete {
    display: inline
  }
  .list-title {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: .25rem;
    width: 75%
  }
  .list-title:focus {
    background: white
  }
  .card {
    margin: 5px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .24);
    padding: 10px
  }
  .card-ghost {
    transition: .25s all;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .12);
    transform: scale(1.1)
  }
  .card-ghost-drop {
    transform: scale(1)
  }
  .list-drag-handle {
    cursor: move;
    padding: 5px
  }
  .list-delete {
    cursor: pointer;
    padding: 5px
  }
  .item-entry {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #DDDDDD
  }
  .new-list {
    width: $column-width;
    margin-left: -10px
  }
  .clear-button {
    position: absolute;
    top: 20px;
    right: 20px
  }
  .refresh {
    font-size: 2rem;
    width: min-content;
    position: absolute;
    right: 2rem;
    top: .5rem;
    cursor: pointer;
    z-index: 9;
    transition: transform .66s ease-in-out 0s
  }
  .refresh.clicked {
    transform: rotate(360deg)
  }
  .nav_open .refresh {
    opacity: 0;
    pointer-events: none
  }
  @media (hover: none) {
    .list-header .list-delete {
      display: inline
    }
  }
  .quickCiteText {
    user-select: all;
    background-color: #EDEDED;
    border-radius: .75rem;
    padding: .5rem
  }
  .copyText {
    font-size: .9em
  }
  .referenceButton {
    width: 100%;
    text-align: center
  }
</style>

<template>
  <section v-dragscroll.x.nomiddle.noright.noback.noforward="!dragging && !hover" class="board-container">
    <div class="board">
      <div class="lists-container">
        <Container
          lock-axis="x"
          orientation="horizontal"
          drag-handle-selector=".list-drag-handle"
          @drop="onListDrop"
          @drag-start="dragging = true"
          @drag-end="dragging = false"
        >
          <template v-for="(citation, citationIndex) in citations">
            <Draggable :key="citation.id">
              <div ref="list" class="list-container" :data-id="citation.id">
                <div class="list-header">
                  <span class="list-drag-handle">
                    <font-awesome-icon icon="bars" />
                  </span>
                  <input class="list-title" :value="citation.title" @blur="editList($event, citation.id)">
                  <span class="list-delete" @click="removeList(citation.id)">
                    <font-awesome-icon icon="times" />
                  </span>
                </div>
                <Container
                  group-name="citation"
                  drag-class="card-ghost"
                  drop-class="card-ghost-drop"
                  non-drag-area-selector=".icon"
                  :animation-duration="100"
                  @drag-start="vibrate(200), dragging = true"
                  @drag-end="vibrate(300), dragging = false"
                  @drop="e => onCardDrop(e, citation, citationIndex)"
                >
                  <Draggable v-for="item in citation.items" :key="item.id + + item.title + item.description + item.date">
                    <Card
                      :item="item"
                      :project="$parent.project"
                      @edit="editItem"
                      @remove="removeItem"
                      @quickCite="quickCite"
                    />
                  </Draggable>
                </Container>
                <div class="item-entry">
                  <ui-item-entry
                    :list-id="citation.id"
                    placeholder="Enter a URL to cite"
                    icon="search"
                    @enter="$parent.$parent.search"
                  />
                  <button v-if="citation.items.length > 0" type="button" class="referenceButton" @click="createReferenceList(citation.id)">
                    Create Reference List
                  </button>
                </div>
              </div>
            </Draggable>
          </template>
          <div class="smooth-dnd-draggable-wrapper">
            <div class="new-list">
              <ui-item-entry placeholder="Add a list" @enter="onAddList" />
            </div>
          </div>
        </Container>
      </div>
    </div>
    <ui-confirm ref="confirm" />
    <ui-modal
      ref="quickCiteModal"
      :active="quickCiteModal"
      :cancellable="1"
      @close="hideQuickCiteModal"
    >
      <div class="quickCite">
        <h3 class="quickCiteText" v-text="cite" />
        <p class="copyText">
          The citation has been copied to your clipboard!
        </p>
      </div>
    </ui-modal>
    <ui-modal
      ref="referencesModal"
      :active="referencesModal"
      :cancellable="1"
      @close="hideReferencesModal"
    >
      <div>
        <p class="quickCiteText" v-text="references" />
        <p class="copyText">
          The Reference List has been copied to your clipboard!
        </p>
      </div>
    </ui-modal>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import { dragscroll } from 'vue-dragscroll'

import { makeDropHandler } from '../utils/plugins'

import Card from '../components/Card'
import UiItemEntry from '../components/ui/UiItemEntry'
import UiConfirm from '../components/ui/UiConfirm'

export default {
  components: {
    Container,
    Draggable,
    UiItemEntry,
    Card,
    UiConfirm
  },
  directives: {
    dragscroll
  },
  props: {
    projectId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      modal: false,
      activeListId: null,
      dragging: true,
      cite: null,
      quickCiteModal: false,
      references: null,
      referencesModal: false
    }
  },
  computed: {
    ...mapState([
      'citations'
    ]),
    hover () {
      return window.matchMedia('(hover: none)').matches
    }
  },
  mounted () {
    this.$store.commit('checkLoggedIn')
  },
  methods: {
    vibrate (num) {
      if ('vibrate' in navigator) {
        window.navigator.vibrate(num)
      }
    },
    onAddList ({ text }) {
      this.$store.dispatch('addList', { projectId: this.projectId, title: text })
      this.$nextTick(() => {
        const lists = this.$refs.list
        lists[lists.length - 1]
          .querySelector('.item-entry input:last-of-type')
          .focus()
      })
    },
    editList (event, id) {
      this.$store.dispatch('editList', { projectId: this.projectId, title: event.target.value, id })
    },
    async removeList (listId) {
      if (await this.$refs.confirm.show('Are you sure you want to delete this list?')) {
        this.$store.dispatch('removeList', { projectId: this.projectId, listId })
        this.$forceUpdate()
      }
    },
    quickCite (item) {
      let cite
      if (item.author) {
        if (item.author.includes(' ')) {
          cite = item.author.split(' ')[1]
        } else {
          cite = item.author
        }
      } else {
        const error = {}
        error.description = 'No author for citation'
        this.$store.commit('error', error)
      }
      if (item.date && String(item.date).includes('-')) {
        cite = '(' + cite + ' ' + item.date.split('-')[0] + ')'
        navigator.clipboard.writeText(cite)
        this.showQuickCiteModal(cite)
      } else {
        const error = {}
        error.description = 'No date for citation'
        this.$store.commit('error', error)
      }
    },
    showQuickCiteModal (cite) {
      this.cite = cite
      this.quickCiteModal = true
    },
    hideQuickCiteModal () {
      this.cite = null
      this.quickCiteModal = false
    },
    editItem (item) {
      this.dragging = false
      this.$parent.$parent.showCiteModal(item)
    },
    async removeItem (item) {
      if (await this.$refs.confirm.show('Are you sure you want to delete this item?')) {
        this.$store.dispatch('removeItem', { projectId: this.projectId, itemId: item.id })
        this.$forceUpdate()
      }
    },
    onListDrop: makeDropHandler('onListDropComplete'),
    onListDropComplete (src, trg) {
      this.$store.dispatch('moveList', [this.projectId, src.index, trg.index])
    },
    onCardDrop: makeDropHandler('onCardDropComplete'),
    onCardDropComplete (src, trg, element, payload) {
      this.dragging = false
      this.$store.dispatch('moveItem', [
        this.projectId,
        src.params[1],
        src.index,
        trg.params[1],
        trg.index
      ])
    },
    focusInput (listId) {
      const index = this.lists.findIndex(list => list.id === listId)
      if (index > -1) {
        this.$refs.list[index].querySelector('input').focus()
      }
    },
    createReferenceList (id) {
      const citations = this.$store.getters.getListById(id)
      let references = ''
      for (const citation in citations.items) {
        if (citations.items[citation].author.includes(' ')) {
          references = references + citations.items[citation].author.split(' ')[1] + citations.items[citation].author.split(' ')[0].charAt(0) + '., '
        } else {
          references = references + citations.items[citation].author + ', '
        }
        references = references + citations.items[citation].date.split('-')[0] + '. ' + citations.items[citation].title + ' [viewed ' + citations.items[citation].dateRetrieved + ']. Available from: ' + citations.items[citation].url + '\n'
      }
      this.showReferencesModal(references)
    },
    showReferencesModal (references) {
      this.references = references
      this.referencesModal = true
    },
    hideReferencesModal () {
      this.references = null
      this.referencesModal = false
    }
  }
}
</script>
