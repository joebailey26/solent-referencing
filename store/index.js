import createPersistedState from 'vuex-persistedstate'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://csuundbzryyxvxgthqgy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTEzMjA0MCwiZXhwIjoxOTU0NzA4MDQwfQ.YHvLdGynUYZYLYS5Eqofozz0tgJPuwnqoEHEoSV1-BA')

export const actions = {
  async supabaseLogin ({ commit }, { email, password }) {
    const supabaseAuth = await supabase.auth.signIn({
      email,
      password
    })
    commit('supabaseAuth', supabaseAuth)
  },
  async supabaseLogout ({ commit }) {
    const supabaseAuth = await supabase.auth.signOut()
    commit('supabaseAuth', supabaseAuth)
  }
}

export const mutations = {
  supabaseAuth (state, { user, session, error }) {
    state.auth.user = user
    state.auth.session = session
    state.auth.error = error
  }
}

export const getters = {
  supabaseLoggedIn () {
    return supabase.auth.user()
  }
}

export const state = () => ({
  auth: {}
})

let plugins

if (process.env.NODE_ENV === 'production') {
  plugins = [createPersistedState]
}

export default {
  actions,
  mutations,
  getters,
  state,
  plugins
}
