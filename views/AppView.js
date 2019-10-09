import LoadingView from './LoadingView.js'
import ListView from './ListView.js'

function AppView (state, emit) {
  if (state.items === undefined) return LoadingView()
  const list = new ListView(state, emit)
  return list.element
}

export default AppView
