import Vue from 'vue'

import UiModal from './UiModal'
import UiInput from './UiInput'

const components = {
  UiModal,
  UiInput
}

Object
  .keys(components)
  .forEach(name => Vue.component(name, components[name]))
