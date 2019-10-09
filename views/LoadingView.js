import { html } from 'https://unpkg.com/lighterhtml?module'

function LoadingView (text = 'Loading...') {
  return html`
    <div class="vh-100 dt w-100">
      <div class="dtc v-mid tc ph3 ph4-l">
        <h1 class="f3 f2-m fw6 tc">${text}</h1>
      </div>
    </div>
  `
}

export default LoadingView
