import { createAPIGatewayHandler } from './util';

export const hello = createAPIGatewayHandler(event => ({
  body: {
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event,
  },
}));
