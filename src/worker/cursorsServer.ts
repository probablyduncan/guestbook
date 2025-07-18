import { Server, type Connection, type ConnectionContext, type WSMessage } from "partyserver";

export class Cursors extends Server<Env> {

    readonly options = { hibernate: true };

    _cursor_cache = new Map<string, {
        hue: number;
        pos: Vec2;
    }>();

    onConnect(connection: Connection, ctx: ConnectionContext): void | Promise<void> {
        connection.send(JSON.stringify({
            type: "init",
            connections: [...this._cursor_cache.entries()].map(([id, props]) => ({ id, ...props })),
        }));
    }

    onClose(connection: Connection, code: number, reason: string, wasClean: boolean): void | Promise<void> {
        this._cursor_cache.delete(connection.id);
        this.broadcast(JSON.stringify({
            type: "leave",
            id: connection.id,
        }))
    }

    onMessage(connection: Connection, message: WSMessage): void | Promise<void> {

        const data = JSON.parse(message.toString()) as ClientToServer_CursorMessages;

        switch (data.type) {

            case "message":

                this.broadcast(JSON.stringify({
                    type: "message",
                    id: connection.id,
                    message: data.message,
                }), [connection.id]);
                break;

            case "init":

                this._cursor_cache.set(connection.id, {
                    hue: data.hue,
                    pos: [-1, -1],
                });

                this.broadcast(JSON.stringify({
                    type: "join",
                    id: connection.id,
                    hue: data.hue
                }), [connection.id]);

                break;

            case "pos":

                this._cursor_cache.set(connection.id, {
                    hue: 0,
                    ...this._cursor_cache.get(connection.id) ?? {},
                    pos: data.pos
                })

                this.broadcast(JSON.stringify({
                    id: connection.id,
                    ...data,
                }), [connection.id]);

                break;
        }
    }
}