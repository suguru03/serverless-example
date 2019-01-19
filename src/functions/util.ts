import { Handler, Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CustomError } from '../errors';

interface HandlerResult {
  statusCode?: number;
  body?: string | object;
}

type CustomHandler = (
  event: APIGatewayProxyEvent,
  context: Context,
) => void | HandlerResult | Promise<HandlerResult>;

export const createAPIGatewayHandler = (handler: CustomHandler): Handler => async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    // check headers

    const { statusCode = 200, body = '' } = (await handler(event, context)) || {};
    return createResponse({
      statusCode,
      body: JSON.stringify(body),
    });
  } catch (error) {
    let { statusCode, message } = error;
    if (!(error instanceof CustomError)) {
      statusCode = 500;
      message = 'Internal Server Error';
    }
    return createResponse({
      statusCode,
      body: JSON.stringify({ message }),
    });
  }
};

const createResponse = (response: APIGatewayProxyResult): APIGatewayProxyResult => ({
  ...response,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...response.headers,
  },
});
