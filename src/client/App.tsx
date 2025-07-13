import { createSignal } from 'solid-js'
import { Cursors } from './components/Cursors';

export default function App() {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('unknown');

  return (
    <>
      <h1>Hello!</h1>
      <Cursors />
      <p class='little-message-popup'>Press <kbd>/</kbd> to say something whimsical.</p>
      <button
        onClick={() => setCount((count) => count + 1)}
        aria-label='increment'
      >
        count is {count()}
      </button>
      &nbsp;&nbsp;
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
