// The following code is taken from https://github.com/bcomnes/lighterhui
import { html } from 'https://unpkg.com/lighterhtml?module'
import disconnected from 'https://unpkg.com/disconnected?module'
import Event from 'https://unpkg.com/@ungap/event?module'
import WeakSet from 'https://unpkg.com/@ungap/essential-weakset?module'
export { render, html } from 'https://unpkg.com/lighterhtml?module'

const observe = disconnected({ Event, WeakSet })

const updating = Symbol('updating')
const first = Symbol('first')
const element = Symbol('element')

class Component {
  constructor (opts) {
    if (!opts) opts = {}

    this[element] = null
    this[updating] = false
    this[first] = true

    this.loaded = false

    this.html = html.for(this)
  }

  get element () {
    if (this[first]) {
      this[first] = false
      this[element] = this.createElement()
      observe(this[element])
      this[element].addEventListener('connected', this._onload.bind(this))
      this[element].addEventListener('disconnected', this._onunload.bind(this))
    }

    return this[element]
  }

  set element (el) {
    this[element] = el
  }

  update () {
    if (this[updating]) return
    this[updating] = true
    window.requestAnimationFrame(this._reallyUpdate.bind(this))
  }

  _reallyUpdate () {
    if (!this[updating]) return
    this[updating] = false
    this.render()
  }

  createElement () {
    // overwrite me
    return null
  }

  render () {
    this.createElement()
  }

  onload () {
    // overwrite me
  }

  onunload () {
    // overwrite me
  }

  _onload () {
    this.loaded = true
    this.onload()
  }

  _onunload () {
    this.loaded = false
    this[updating] = false
    this.onunload()
  }
}

export default Component
