import { routePartykitRequest } from "partyserver";

export default {
  async fetch(request, env) {
    
    const partykitResponse = await routePartykitRequest(request, { ...env });
    if (partykitResponse !== null) {
      return partykitResponse;
    }
    
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return Response.json({
        name: "Boingo",
      });
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler<Env>;

export { Cursors } from "./cursorsServer";