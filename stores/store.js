function store (state, bus) {
  state.places = [
    { text: 'Mushrooms!', latlng: { lat: 56.031005763355395, lng: 14.622974395751955 } },
    { text: 'More Mushrooms!', latlng: { lat: 56.06063205928058, lng: 14.615049366684604 } }
  ]

  setTimeout(function () {
    state.places.push({ text: 'Mushrooms!', latlng: { lat: 56.031005763355395, lng: 14.622974395751955 } })
    bus.emit('render')
  }, 1000)

  bus.on('map:marker:add', onMapMarkerAdd)

  function onMapMarkerAdd (place) {
    state.places.push(place)
    bus.emit('render')
  }
}

export default store
