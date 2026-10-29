import serverless from "serverless-http";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import app from "./app";
import sequelize from "./config/database";

const serverlessApp = serverless(app);

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<APIGatewayProxyResultV2> => {
  // No esperar a que el event loop quede vacío antes de responder.
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const response = await serverlessApp(event, context);
    return response as APIGatewayProxyResultV2;
  } finally {
    // Sequelize recomienda no reutilizar conexiones entre invocaciones.
    // Si todavía no hay base de datos configurada, no hay nada que cerrar.
    try {
      await sequelize.connectionManager.close();
    } catch {
      // Noop
    }
  }
};
