import { Server, type Connection, type ConnectionContext, type WSMessage } from "partyserver";

// export class Cursors extends DurableObject<Env> {
//     constructor(ctx: DurableObjectState, env: Env) {
//         super(ctx, env);
//     }

//     async sayHello(): Promise<string> {
//         return "Hello!";
//     }
// }

export class Cursors extends Server<Env> {

    _cursor_cache = new Map<string, {
        hue: number;
        pos: [number, number];
    }>();

    onConnect(connection: Connection, ctx: ConnectionContext): void | Promise<void> {
        // here, send all current cursors to the client,
        this.broadcast(JSON.stringify({
            type: "join"
        }))
    }

    onMessage(connection: Connection, message: WSMessage): void | Promise<void> {

        const data = JSON.parse(message.toString()) as ClientToServer_CursorMessages;

        switch (data.type) {
            case "message":

                this.broadcast(message, [connection.id]);

                break;
            case "init":

                this._cursor_cache.set(connection.id, {
                    hue: data.hue,
                    pos: [-1, -1],
                });

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