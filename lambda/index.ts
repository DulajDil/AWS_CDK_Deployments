import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  console.log('Request path:', event.path);
  console.log('HTTP method:', event.httpMethod);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Hello, world Dulaj",
      timestamp: new Date().toISOString(),
      path: event.path
    })
  };
};
