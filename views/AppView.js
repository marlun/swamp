import { html } from 'https://unpkg.com/lighterhtml-plus?module'
import MapView from './MapView.js'

function AppView (components, state, emit) {
  const map = components(MapView, 'map')
  return html`
    <main>
      ${map.render()}
      <ul>
        ${state.places.map(place => {
          return html`<li>${place.text}</li>`
        })}
      </ul>
    </main>
  `
}

export default AppView
