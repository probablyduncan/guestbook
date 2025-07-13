import { createSignal } from "solid-js";
import { createCursorIcon } from "../lib/cursorIcon";
import { createCursorSocket } from "../lib/cursorSocket";
import styles from "../styles/cursors.module.css";

export function YourCursor({ id, hue, initialPos }: { id: string, hue: number, initialPos: Vec2 }) {
  const { iconHtml, sweat } = createCursorIcon();
  const [message, setMessage] = createSignal<string>("");
  const [pos, setPos] = createSignal<Vec2>(initialPos);
  const { listen } = createCursorSocket();

  listen("pos", ({ id: targetId, pos }) => {
    // console.log(id, "at", pos.map(p => Math.round(p * 100) / 100))
    if (targetId === id) {
      setPos(pos);
    }
  });

  let messageTimeoutId: number;
  listen("message", ({ id: targetId, message: newMessage }) => {
    // console.log(id, "said", message);
    if (targetId === id) {
      clearTimeout(messageTimeoutId);
      messageTimeoutId = setTimeout(() => {
        setMessage("");
      }, 2000);
      setMessage(newMessage);
      sweat();
    }
  });

  return (
    <div class={styles.cursor} style={{
      "--hue": hue,
      "--x": pos()[0],
      "--y": pos()[1],
    }}>
      <svg innerHTML={iconHtml()} />
      <div>{message()}</div>
    </div>
  )
}