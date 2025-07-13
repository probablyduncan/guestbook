import PartySocket from "partysocket";
import { getOwner, onCleanup, runWithOwner } from "solid-js";

const ws = new PartySocket({
    host: window.location.host,
    party: "cursors",
    room: "all",
});

type Listener<K extends ServerToClient_CursorMessageKeys> =
    (params: Omit<Extract<ServerToClient_CursorMessages, { type: K }>, "type">) => void;

const listeners: {
    [K in ServerToClient_CursorMessageKeys]?: {
        listener: Listener<K>,
        id: string,
    }[];
} = {};

function listen<K extends ServerToClient_CursorMessageKeys>(
    type: K,
    listener: Listener<K>,
) {
    const listenerId = crypto.randomUUID();
    listeners[type] ??= [];
    listeners[type].push({ listener, id: listenerId });

    // cleanup detached listeners
    const owner = getOwner();
    if (owner) {
        runWithOwner(owner, () => {
            onCleanup(() => {
                const index = listeners[type]?.findIndex((l) => l.id === listenerId) ?? -1;
                if (index !== -1) {
                    listeners[type]?.splice(index, 1);
                }
            });
        });
    }
}

ws.addEventListener("message", e => {

    try {
        const message = JSON.parse(e.data);
        const listenersForType = listeners[(message?.type ?? "") as ServerToClient_CursorMessageKeys];

        if (!listenersForType) {
            return;
        }

        listenersForType.forEach(l => l.listener(message));
    }
    catch {
        console.error("Invalid Message!")
    }
});

function send<K extends ClientToServer_CursorMessageKeys>(
    type: K,
    data: Omit<Extract<ClientToServer_CursorMessages, { type: K }>, "type">,
) {
    ws.send(JSON.stringify({
        type,
        ...data,
    }))
}

export const createCursorSocket = () => ({
    send,
    listen,
});