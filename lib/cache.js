const cache = {}

function fn (state, emit) {
  return function (Component, id, ...args) {
    if (cache[id] !== undefined) return cache[id]
    cache[id] = new Component(this, state, emit, args)
    return cache[id]
  }
}

export default fn
