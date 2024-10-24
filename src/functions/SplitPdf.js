import fnSplitPdf from "./services/fnSplitPdf.js";
import { app } from "@azure/functions";
app.http("splitPdf", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const json = request.query.get("json") || (await request.json());
      const respuesta = await fnSplitPdf(json);
      if (!respuesta) {
        return { status: 400, jsonBody: { error: "Error al SPLIT PDF" } };
      } else {
        return { body: respuesta };
      }
    } catch (error) {
      console.error("Error en SplitPdf endpoint:", error);
      return { status: 500, jsonBody: { error: "Error interno del servidor" } };
    }
  },
});
export default app;
