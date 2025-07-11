import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import cloudflareLogo from './assets/Cloudflare_Logo.svg'
import './App.css'
import { createSignal } from 'solid-js'

function App() {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('unknown')

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} class='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} class='logo react' alt='React logo' />
        </a>
        <a href='https://workers.cloudflare.com/' target='_blank'>
          <img src={cloudflareLogo} class='logo cloudflare' alt='Cloudflare logo' />
        </a>
      </div>
      <h1>Vite + React + Cloudflare</h1>
      <div class='card'>
        <button
          onClick={() => setCount((count) => count + 1)}
          aria-label='increment'
        >
          count is {count()}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div class='card'>
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
        <p>
          Edit <code>worker/index.ts</code> to change the name
        </p>
      </div>
      <p class='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
