import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faAngleRight, faEdit, faTimes, faBars, faCopy } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faAngleRight, faEdit, faTimes, faBars, faCopy)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
