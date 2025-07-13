import { createSignal, For } from "solid-js"
import { MyCursor } from "./MyCursor";
import { createCursorSocket } from "../lib/cursorSocket";
import { YourCursor } from "./YourCursor";

export function Cursors() {

    const { listen } = createCursorSocket();

    // lists of things that get set on init/join
    const [staticCursorData, setStaticCursorData] = createSignal<{
        id: string,
        hue: number,
        initialPos: [number, number],
    }[]>([])

    listen("init", ({ connections }) => {
        // console.log(connections.length, "others connected");
        connections.forEach(c => {
            setStaticCursorData(prev => {
                return [...prev, { id: c.id, hue: c.hue, initialPos: c.pos, }];
            })
        });
    });

    listen("join", ({ id, hue }) => {
        // console.log(id, "joined");
        setStaticCursorData(prev => {
            return [...prev, { id, hue, initialPos: [-1, -1] }];
        })
    });

    listen("leave", ({ id }) => {
        // console.log(id, "disconnected");
        setStaticCursorData(prev => {
            return prev.filter(c => c.id !== id);
        })
    });

    function getCountDisplay() {
        const num = staticCursorData().length;
        return `There ${num === 1 ? "is" : "are"} ${num} other ${num === 1 ? "person" : "people"} here.`;
    }

    return (<>
        <p>{getCountDisplay()}</p>
        <For each={staticCursorData()}>
            {c => <YourCursor id={c.id} hue={c.hue} initialPos={c.initialPos} />}
        </For>
        <MyCursor />
    </>)
}