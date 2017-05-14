import * as React from 'react'
import { render } from 'react-dom'
// missing type definiton for rehydrate
const rehydrate = require('glamor').rehydrate // tslint:disable-line

import { SSR } from './ssr'

interface SSRWindow extends Window {
  ssr: SSR
}

export default function mount() {
  const ssr = (window as SSRWindow).ssr

  rehydrate(ssr.cssIds)

  // use require to ensure glamor rehydrate is called before styles are created
  // https://github.com/threepointone/glamor/issues/64
  const App = require('./components/App').default

  render(<App {...ssr.props} />, document.getElementById('react-root'))
}
