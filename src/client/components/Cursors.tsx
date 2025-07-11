import { createSignal } from "solid-js";
import { For } from "solid-js/web";

export function Cursors() {

    const [cursors, setCursors] = createSignal([]);

    return <For each={cursors()}>
        {cursor => <Cursor cursor={cursor} />}
    </For>
}