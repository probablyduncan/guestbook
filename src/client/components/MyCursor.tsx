import { createSignal, For, onCleanup, onMount } from "solid-js"
import styles from "../styles/cursors.module.css";
import { createCursorSocket } from "../lib/cursorSocket";
import { createCursorIcon, POINTER_FRAMES } from "../lib/cursorIcon";
import { createCursorInputPlaceholder } from "../lib/cursorInputPlaceholder";
import { debounce } from "../lib/debounce";
import { FRAME_DELAY } from "../../shared/consts";

export function MyCursor() {

    const [pos, setPos] = createSignal<Vec2>([-100, -100]);
    const [message, setMessage] = createSignal<string>("");

    const { send } = createCursorSocket();

    const hue = Math.floor(Math.random() * 255);

    let inputElement: HTMLInputElement | undefined;
    let messageTimeoutId: number;

    const { iconHtml, sweat } = createCursorIcon();
    const { animatePlaceholder, randomizePlaceholder, placeholder } = createCursorInputPlaceholder();


    const sendPosDebounced = debounce((pos: Vec2) => {
        send("pos", { pos });
        addGhost(pos);
    }, FRAME_DELAY);

    const GHOST_COUNT = 7;
    const [ghosts, setGhosts] = createSignal<Vec2[]>([]);
    function addGhost(pos: Vec2) {
        setGhosts(prev => {
            prev.push(pos);
            return prev.slice(Math.max(0, prev.length - GHOST_COUNT));
        });
    }

    function handleMouseMove(e: MouseEvent) {
        const _pos: Vec2 = [
            e.x / window.innerWidth,
            e.y / window.innerHeight,
        ];
        setPos(_pos);
        sendPosDebounced(_pos);
    }

    function focusInput() {
        if (!inputElement) {
            return;
        }

        inputElement.value = "";
        inputElement.hidden = false;
        inputElement.focus();
    }

    function blurInput() {
        if (!inputElement) {
            return;
        }

        inputElement.hidden = true;
        inputElement.value = "";
        randomizePlaceholder();
    }

    function onWindowKeyPress(e: KeyboardEvent) {
        if (e.key === "/" && !["input", "textarea"].includes(document.activeElement?.tagName.toLowerCase() ?? "")) {
            e.preventDefault();
            focusInput();
            sweat();
            animatePlaceholder();
        }
    }

    function onInputKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();

            const val = inputElement?.value;
            if (!val) {
                return;
            }

            blurInput();

            setMessage(val);
            send("message", {
                message: val,
            });

            clearTimeout(messageTimeoutId);
            messageTimeoutId = setTimeout(() => {
                setMessage("");
            }, 2000);
        }

        if (e.key === "Escape") {
            e.preventDefault();
            blurInput();
        }
    }

    onMount(() => {
        send("init", { hue });

        window.addEventListener("mousemove", handleMouseMove);
        inputElement?.addEventListener("blur", blurInput);
        inputElement?.addEventListener("keydown", onInputKeyDown);
        window.addEventListener("keypress", onWindowKeyPress);
    });

    onCleanup(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        inputElement?.removeEventListener("mousemove", blurInput);
        inputElement?.removeEventListener("keydown", onInputKeyDown);
        window.removeEventListener("keypress", onWindowKeyPress);
    });

    return (<>
        <For each={ghosts()}>
            {(ghost) => (
                <div class={styles.cursor + " " + styles.ghost} style={{
                    "--x": ghost[0],
                    "--y": ghost[1],
                    "--hue": hue,
                }}>
                    <svg innerHTML={POINTER_FRAMES[0]} />
                </div>
            )}
        </For>
        <div class={styles.cursor} style={{
            "--x": pos()[0],
            "--y": pos()[1],
            "--hue": hue,
        }}>
            <svg innerHTML={iconHtml()} />
            <input hidden ref={inputElement} placeholder={placeholder()} />
            <div>{message()}</div>
        </div>
    </>)
}
