import assert from './assert.js'

class MessageBus {
  constructor () {
    this.listeners = {}
  }

  on (eventName, listener) {
    assert(typeof eventName === 'string', 'MessageBus.on: eventName should be type string')
    assert(typeof listener === 'function', 'MessageBus.on: listener should be type function')

    if (!this.listeners[eventName]) this.listeners[eventName] = []
    this.listeners[eventName].push(listener)
  }

  emit (eventName, ...args) {
    assert(typeof eventName === 'string', 'MessageBus.emit: eventName should be type string')

    if (this.listeners[eventName] === undefined) return

    for (const listener of this.listeners[eventName]) {
      listener.apply(listener, args)
    }
  }
}

export default MessageBus
