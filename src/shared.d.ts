type ClientToServer_CursorMessages = {
    /**
     * sent on message
     */
    type: "message";
    message: string;
} | {
    /**
     * sent on move
     */
    type: "pos";
    pos: [number, number];
} | {
    /**
     * sent on mount
     */
    type: "init";
    hue: number;
}
type ClientToServer_CursorMessageKeys = ClientToServer_CursorMessages["type"];

type ServerToClient_CursorMessages = {
    /**
     * broadcast to others on client message
     */
    type: "message";
    id: string;
    message: string;
} | {
    /**
     * broadcast to others on client pos update
     */
    type: "pos";
    id: string;
    pos: [number, number];
} | {
    /**
     * sent on connect
     */
    type: "init";
    connections: {
        id: string;
        hue: number;
        pos: [number, number];
    }[];
} | {
    /**
     * broadcast to others on connect
     */
    type: "join";
    id: string;
    hue: number;
} | {
    /**
     * broadcast to others on disconnect
     */
    type: "leave";
    id: string;
};

type ServerToClient_CursorMessageKeys = ServerToClient_CursorMessages["type"];