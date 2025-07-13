import { createSignal, onCleanup, onMount } from "solid-js"
import styles from "../styles/cursors.module.css";
import { createCursorSocket } from "../lib/cursorSocket";
import { createCursorIcon } from "../lib/createCursorIcon";

export function MyCursor() {

    const [pos, setPos] = createSignal<[number, number]>([-100, -100]);
    const [message, setMessage] = createSignal<string>("");
    const { iconHtml, sweat } = createCursorIcon();

    const [placeholderIndex, setPlaceholderIndex] = createSignal(0);
    const placeholders = [
        "type away . . .",
        "speak your truth",
        "say something",
        "spill it!",
        "let it out!",
        "spill the beans!",
        "beans? spill 'em",
        "gossip time . . .",
        "ok, chatterbox",
        "look at you!",
        "well? say something!",
        "${placeholder text}",
        ". . .",
        "stop that!!",
        "i'm listening . . .",
        "what is it this time?",
    ] as const;

    function randomizePlaceholder() {
        setPlaceholderIndex(prev => {
            let next = Math.floor(Math.random() * (placeholders.length - 1));
            if (next >= prev) {
                next++;
            }
            return next;
        });
    }

    let animatePlaceholderIntervalId: number;
    function animatePlaceholder() {

        if (!inputElement) {
            return;
        }

        clearInterval(animatePlaceholderIntervalId);
        inputElement.placeholder = "";

        const placeholder = placeholders[placeholderIndex()];
        let i = 0;

        animatePlaceholderIntervalId = setInterval(() => {

            inputElement.placeholder += placeholder.charAt(i);
            i++;

            if (i >= placeholder.length) {
                clearInterval(animatePlaceholderIntervalId);
            }
        }, 50);
    }

    // const { sendCursorWSMessage } = createCursorWS();

    const { send } = createCursorSocket();

    const hue = Math.floor(Math.random() * 255);

    let inputElement: HTMLInputElement | undefined;
    let messageTimeoutId: number;

    function handleMouseMove(e: MouseEvent) {
        const _pos: [number, number] = [
            e.x / window.innerWidth,
            e.y / window.innerHeight,
        ];
        setPos(_pos);
        send("pos", { pos: _pos });
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

            sweat();
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
            <input hidden ref={inputElement} />
            <div>{message()}</div>
        </div>
    )
}
