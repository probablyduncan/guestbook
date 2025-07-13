import { createSignal } from "solid-js";
import { FRAME_DELAY } from "../../shared/consts";

export function createCursorInputPlaceholder() {
    
    const [placeholder, setPlaceholder] = createSignal<string>("");
    const [placeholderIndex, setPlaceholderIndex] = createSignal<number>(0);
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

        clearInterval(animatePlaceholderIntervalId);
        setPlaceholder("");

        const fullText = placeholders[placeholderIndex()];
        let i = 0;

        animatePlaceholderIntervalId = setInterval(() => {

            setPlaceholder(prev => prev += fullText.charAt(i));
            i++;

            if (i >= fullText.length) {
                clearInterval(animatePlaceholderIntervalId);
            }
        }, FRAME_DELAY);
    }

    return {
        animatePlaceholder,
        randomizePlaceholder,
        placeholder,
    }
}
