import React, { useState } from 'react'
import './styles/app.css'

function App(): JSX.Element {
  const [counter, setCount] = useState(0)
  const onClick = (): void => setCount(counter + 1)

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={onClick}>Clicked {counter} times !</button>
    </div>
  )
}

export default App
