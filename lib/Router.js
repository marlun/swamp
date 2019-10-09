import assert from './assert.js'

// Very simple router that supports parameters (named url segments) which is
// sent as parameters to the handler function
//
// Ex: router.on('/user/:id', (params) => params.id)

class Router {
  constructor (options = {}) {
    this.routes = {}
    this.root = options.root || ''
  }

  on (route, handler) {
    assert(typeof route === 'string', 'Router.on: route should be type string')
    assert(typeof handler === 'function', 'Router.on: handler should be type function')

    const regex = route.replace(/:(\w+)/g, '(?<$1>[^/]+)') + '(?:/|$)'
    this.routes[regex] = handler
  }

  emit (route) {
    assert(typeof route === 'string', 'Router.emit: route should be type string')

    const fragment = route.replace(this.root, '') + '/'

    for (const key in this.routes) {
      const regex = new RegExp(key)
      const match = fragment.match(regex)
      if (match) return this.routes[key](match.groups)
    }
    throw new Error('no matching route')
  }
}

export default Router
