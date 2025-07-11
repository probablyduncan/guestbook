import { createSignal } from 'solid-js'
import { MyCursor } from './components/MyCursor';

function App() {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('unknown')

  return (
    <>
      <h1>Hello!</h1>
      <p>What's on the menu today???</p>
      <MyCursor />
      <button
        onClick={() => setCount((count) => count + 1)}
        aria-label='increment'
      >
        count is {count()}
      </button>
      <button
        onClick={() => {
          fetch('/api/')
            .then((res) => res.json() as Promise<{ name: string }>)
            .then((data) => setName(data.name))
        }}
        aria-label='get name'
      >
        Hotspot name is: {name()}
      </button>
    </>
  )
}

export default App
