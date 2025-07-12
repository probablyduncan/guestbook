import { createSignal } from "solid-js";

export function CursorInput() {

    let el: HTMLInputElement | undefined;

    const [placeholderIndex, setPlaceholderIndex] = createSignal(0);
    const placeholders = [
        "type away...",
        "speak your truth",
        "say something",
        "spill it!",
        "let it out!",
        "spill the beans!",
        "beans? spill 'em",
        "gossip time",
        "ok, chatterbox",
        "look at you",
        "${placeholder text}",
        "...",
        "stop that!!",
        "i'm listening...",
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

        if (!el) {
            return;
        }

        clearInterval(animatePlaceholderIntervalId);
        el.placeholder = "";

        const placeholder = placeholders[placeholderIndex()];
        let i = 0;

        animatePlaceholderIntervalId = setInterval(() => {

            el.placeholder += placeholder.charAt(i);
            i++;

            if (i >= placeholder.length) {
                clearInterval(animatePlaceholderIntervalId);
            }
        }, 50);
    }

    return <input ref={el} />
}