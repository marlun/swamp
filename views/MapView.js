import Component from '../lib/Component.js'
import * as L from 'https://unpkg.com/leaflet@1.5.1/dist/leaflet-src.esm.js'

class MapView extends Component {
  constructor (components, state, emit) {
    super()
    this.components = components
    this.state = state
    this.emit = emit
    this.onMapClick = this.onMapClick.bind(this)
  }

  createElement () {
    return this.html`
      <div id="mapid"></div>
    `
  }

  onload () {
    if (this.map) return
    console.log('Map is added to DOM')
    this.map = L.map('mapid').setView([56.052302150217, 14.588513374328615], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18
    }).addTo(this.map)
    this.markerGroup = L.layerGroup().addTo(this.map)
    this.map.on('click', this.onMapClick)
    this.state.places.forEach(place => {
      const marker = L.marker(place.latlng).addTo(this.markerGroup)
      marker.bindPopup(place.text).openPopup()
      place.markerId = marker._leaflet_id
    })
  }

  onunload () {
    console.log('Map is removed from DOM')
  }

  onMapClick (e) {
    const marker = L.marker(e.latlng).addTo(this.markerGroup)
    marker.bindPopup('Svamp!').openPopup()
    this.emit('map:marker:add', {
      markerId: marker._leaflet_id,
      text: 'Default',
      latlng: e.latlng
    })
  }
}

export default MapView
