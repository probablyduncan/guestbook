import { createSignal, For } from 'solid-js'
import { MyCursor } from './components/MyCursor';
import { createCursorSocket } from './lib/cursorSocket';
import styles from "./styles/cursors.module.css";
import { ReactiveMap } from '@solid-primitives/map';
import { createCursorIcon } from './lib/createCursorIcon';

function App() {
  const [count, setCount] = createSignal(0);
  const [name, setName] = createSignal('unknown');

  const { listen } = createCursorSocket();

  // const [cursors, setCursors] = createSignal<Record<string, { id: string, hue: number, pos: [number, number], message?: string }>>({});

  const cursors = new ReactiveMap<string, {
    id: string,
    hue: number,
    pos: [number, number],
    message?: string,
    messageTimeoutId?: number,
  }>();

  listen("init", ({ connections }) => {
    // console.log(connections.length, "others connected");
    connections.forEach(c => {
      cursors.set(c.id, c);
    });
  });

  listen("join", ({ id, hue }) => {
    // console.log(id, "joined");
    cursors.set(id, {
      id,
      hue,
      pos: [-1, -1],
    });
  });

  listen("leave", ({ id }) => {
    // console.log(id, "disconnected");
    cursors.delete(id);
  });

  listen("pos", ({ id, pos }) => {
    // console.log(id, "at", pos.map(p => Math.round(p * 100) / 100))
    const c = cursors.get(id);
    if (c) {
      cursors.set(id, { ...c, pos });
    }
  });

  listen("message", ({ id, message }) => {
    // console.log(id, "said", message);
    const c = cursors.get(id);
    if (c) {
      clearTimeout(c.messageTimeoutId);
      const messageTimeoutId = setTimeout(() => {
        const c2 = cursors.get(id);
        if (c2) {
          cursors.set(id, { ...c2, message: undefined, messageTimeoutId: undefined });
        }
      }, 2000);
      cursors.set(id, { ...c, message, messageTimeoutId });
    }
  });

  return (
    <>
      <h1>Hello!</h1>
      <p>There are {cursors.size} other people here.</p>
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

      {[...cursors.values()].map((c) => (
        <YourCursor pos={c.pos} hue={c.hue} message={c.message} />
      ))}
      <MyCursor />

      {/* <ul>
        {[...cursors.values()].map((c) => <li>{c.pos[0]},{c.pos[1]}</li>)}
      </ul> */}
    </>
  )
}

export default App


function YourCursor({ pos, hue, message }: { pos: [number, number], hue: number, message?: string }) {

  const { iconHtml } = createCursorIcon();

  return (
    <div class={styles.cursor} style={{
      "--hue": hue,
      "--x": pos[0],
      "--y": pos[1],
    }}>
      <svg innerHTML={iconHtml()} />
      <div>{message}</div>
    </div>
  )
}