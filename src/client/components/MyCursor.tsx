import { createSignal, onCleanup, onMount } from "solid-js"
import styles from "../styles/cursors.module.css";
import { createCursorSocket } from "../lib/cursorSocket";
import { createCursorIcon } from "../lib/cursorIcon";
import { createCursorInputPlaceholder } from "../lib/cursorInputPlaceholder";
import { debounce } from "../lib/debounce";
import { FRAME_DELAY } from "../../shared/consts";

export function MyCursor() {

    const [pos, setPos] = createSignal<[number, number]>([-100, -100]);
    const [message, setMessage] = createSignal<string>("");

    const { send } = createCursorSocket();

    const hue = Math.floor(Math.random() * 255);

    let inputElement: HTMLInputElement | undefined;
    let messageTimeoutId: number;

    const { iconHtml, sweat } = createCursorIcon();
    const { animatePlaceholder, randomizePlaceholder, placeholder } = createCursorInputPlaceholder();

    const sendPosDebounced = debounce((pos: [number, number]) => send("pos", { pos }), FRAME_DELAY);

    function handleMouseMove(e: MouseEvent) {
        const _pos: [number, number] = [
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
        if (e.key === "/" && document.activeElement !== inputElement) {
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

    return (
        <div class={styles.cursor} style={{
            "--x": pos()[0],
            "--y": pos()[1],
            "--hue": hue,
        }}>
            <svg innerHTML={iconHtml()} />
            <input hidden ref={inputElement} placeholder={placeholder()} />
            <div>{message()}</div>
        </div>
    )
}
