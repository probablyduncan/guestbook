type Vec2 = [number, number];

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
    pos: Vec2;
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
     * broadcast message to other connections
     */
    type: "message";
    id: string;
    message: string;
} | {
    /**
     * broadcast pos to other connections
     */
    type: "pos";
    id: string;
    pos: Vec2;
} | {
    /**
     * send all current connections to new connection
     */
    type: "init";
    connections: {
        id: string;
        hue: number;
        pos: Vec2;
    }[];
} | {
    /**
     * broadcast new connection to other connections
     */
    type: "join";
    id: string;
    hue: number;
} | {
    /**
     * broadcast disconnect to other connections
     */
    type: "leave";
    id: string;
};

type ServerToClient_CursorMessageKeys = ServerToClient_CursorMessages["type"];