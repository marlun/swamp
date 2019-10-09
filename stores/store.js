function store (state, bus) {
  setTimeout(function () {
    state.items = ['test', 'test2', 'test3']
    bus.emit('render')
  }, 1000)
}

export default store
