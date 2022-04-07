import React from 'react'

import { useMyHook } from 'use-date-picker'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
