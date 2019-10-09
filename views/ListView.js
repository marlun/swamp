import { html } from 'https://unpkg.com/lighterhtml?module'
import Component from '../lib/Component.js'

class ListView extends Component {
  constructor (state, emit) {
    super()
    this.state = state
    this.emit = emit
  }

  createElement () {
    return this.html`
      <ul>
        ${this.state.items.map(item => html`<li>${item}</li>`)}
      </ul>
    `
  }
}

export default ListView
