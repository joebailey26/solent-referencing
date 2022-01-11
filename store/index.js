import { createClient } from '@supabase/supabase-js'
import { getItemById, getListById, getListByItemId } from '~/utils/board'
import { makeItem, makeList } from '~/utils/data'
const supabase = createClient('https://csuundbzryyxvxgthqgy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTEzMjA0MCwiZXhwIjoxOTU0NzA4MDQwfQ.YHvLdGynUYZYLYS5Eqofozz0tgJPuwnqoEHEoSV1-BA')

export const actions = {
  async supabaseLogin ({ commit }, { email, password }) {
    const supabaseVue = await supabase.auth.signIn({
      email,
      password
    })
    if (supabaseVue.error) {
      throw supabaseVue.error
    }
    commit('checkLoggedIn')
  },
  async supabaseSignUp ({ commit }, { email, password }) {
    const supabaseVue = await supabase.auth.signUp({
      email,
      password
    })
    if (supabaseVue.error) {
      throw supabaseVue.error
    }
  },
  async supabaseLogout ({ commit }) {
    const supabaseVue = await supabase.auth.signOut()
    if (supabaseVue.error) {
      throw supabaseVue.error
    }
    commit('logout')
    commit('checkLoggedIn')
  },
  async pullReferences ({commit}) {
    const data = await supabase.from('User References Data').select('references')
    commit('putReferences', data)
  },
  async updateReferences ({}, data) {
    await supabase.from('User References Data').update({'references': data})
  },
  addList ({ commit }, { title }) {
    commit('addList', { title })
  },
  editList ({ commit }, { title, id }) {
    commit('editList', { title, id })
  },
  moveList ({ commit }, [fromIndex, toIndex]) {
    commit('moveList', [fromIndex, toIndex])
  },
  removeList ({ commit }, { listId }) {
    commit('removeList', { listId })
  },
  addItem ({ commit }, data) {
    commit('addItem', data)
  },
  updateItem ({ commit }, data) {
    commit('updateItem', data)
  },
  moveItem ({ commit }, [fromListRef, fromIndex, toListRef, toIndex]) {
    commit('moveItem', [fromListRef, fromIndex, toListRef, toIndex])
  },
  removeItem ({ commit }, { itemId }) {
    commit('removeItem', { itemId })
  }
}

export const mutations = {
  putReferences (state, {data}) {
    state.citations = data
  },
  checkLoggedIn (state) {
    if (supabase.auth.user()) {
      state.loggedIn = true
    } else {
      state.loggedIn = false
    }
  },
  logout (state) {
    state.citations = []
  },
  error (state, data) {
    if (data.active !== undefined) {
      state.error.active = data.active
    } else {
      // eslint-disable-next-line no-console
      console.error(data.description)
      state.error.active = true
    }
    state.error.description = data.description
    state.error.data = data.data
  },
  addList (state, { title }) {
    state.citations.push(makeList(title))
  },
  editList (state, { title, id }) {
    state.citations.find(citation => citation.id === id).title = title
  },
  moveList (state, [fromIndex, toIndex]) {
    state.citations.splice(toIndex, 0, state.citations.splice(fromIndex, 1)[0])
  },
  removeList (state, { listId }) {
    state.citations = state.citations.filter(citation => citation.id !== listId)
  },
  addItem (state, { listId, url, title, publisher, author, description, date, dateRetrieved }) {
    let list
    if (listId) {
      list = getListById(state.citations, listId)
    } else {
      const newList = makeList('References')
      state.citations.push(newList)
      list = getListById(state.citations, newList.id)
    }
    list.items.push(makeItem(url, title, publisher, author, description, date, dateRetrieved))
  },
  updateItem (state, { id, url, title, publisher, author, description, date, dateRetrieved }) {
    const item = getItemById(state.citations, id)
    if (item) {
      Object.assign(item, makeItem(url, title, publisher, author, description, date, dateRetrieved))
    }
  },
  moveItem (state, [projectId, fromListRef, fromIndex, toListRef, toIndex]) {
    const fromList = typeof fromListRef === 'number'
      ? state.citations[fromListRef].items
      : getListById(projectId, fromListRef)
    const toList = typeof toListRef === 'number'
      ? state.citations[toListRef].items
      : getListById(projectId, toListRef)
    toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0])
  },
  removeItem (state, { itemId }) {
    const list = getListByItemId(state.citations, itemId)
    list.items.splice(list.items.findIndex(item => item.id === itemId), 1)
  }
}

export const getters = {
  getListById: state => (listId) => {
    return getListById(state.citations, listId)
  },

  getListByItemId: state => (itemId) => {
    return getListByItemId(state.citations, itemId)
  },

  getItemById: state => (itemId) => {
    return getItemById(state.citations, itemId)
  }
}

export const state = () => ({
  loggedIn: false,
  citations: [],
  error: {
    active: false
  }
})

export default {
  actions,
  mutations,
  getters,
  state
}
