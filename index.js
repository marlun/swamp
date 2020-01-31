import { render } from 'https://unpkg.com/lighterhtml-plus?module'
import AppView from './views/AppView.js'
import MessageBus from './lib/MessageBus.js'
import Router from './lib/Router.js'
import store from './stores/store.js'
import cache from './lib/cache.js'

const bus = new MessageBus()
const router = new Router()
const state = {}

// TODO Add description
const emit = function (...args) {
  bus.emit.apply(bus, args)
}

// TODO add description
const components = cache(state, emit)

// When calling a handler for a route (views) we send in the application state
// and a function which can be used to emit events. We don't send in the entire
// bus since we want to keep business logic and render logic separate. We also
// add the params to the state object so that views can access it
function addRoute (route, handler) {
  router.on(route, function (params) {
    state.params = params
    return handler(components, state, function (...args) {
      bus.emit.apply(bus, args)
    })
  })
}

// We listen for 'render' events and re-render the application, morphing from
// the DOM tree created from the last state into the the new.
bus.on('render', function () {
  render(document.body, router.emit(window.location.pathname))
})

// Initialize all our stores which conatins all our business logic and handles
// the state of the application
store(state, bus)

// Setup which views should be loaded on which routes
addRoute('/', AppView)

// Initialize the application after the HTML document has been completely
// loaded and parsed (DOMContentLoaded event) by emitting the 'render' event.
document.addEventListener('DOMContentLoaded', function () {
  bus.emit('DOMContentLoaded')
  bus.emit('render')
})
