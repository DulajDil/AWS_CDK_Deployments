import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Define a lambda function (TypeScript with automatic bundling)
    const helloLambda = new NodejsFunction(this, "HelloWorld", {
      entry: 'lambda/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      bundling: {
        minify: true,
        sourceMap: true
      }
    })

    //Create an API Gateway REST API
    const api = new apigateway.LambdaRestApi(this, 'HelloAPI', {
      handler: helloLambda,
      proxy: true,
      description: 'Hello World API',
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    })

    //Output the API URL
    new cdk.CfnOutput(this, "apiURLOutput", {
      value: api.url
    })
  }
}
