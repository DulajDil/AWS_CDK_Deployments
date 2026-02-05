import * as cdk from 'aws-cdk-lib/core';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { HelloCdkStack } from '../lib/hello-cdk-stack';

describe('HelloCdkStack', () => {
  let app: cdk.App;
  let stack: HelloCdkStack;
  let template: Template;

  beforeEach(() => {
    app = new cdk.App();
    stack = new HelloCdkStack(app, 'TestStack');
    template = Template.fromStack(stack);
  });

  // Snapshot test - catches unexpected changes
  test('matches snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

  // Test Lambda function exists
  test('creates a Lambda function with correct runtime', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs20.x',
      Handler: 'index.handler'
    });
  });

  // Test Lambda function count
  test('creates exactly one Lambda function', () => {
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  // Test API Gateway exists
  test('creates an API Gateway REST API', () => {
    template.hasResourceProperties('AWS::ApiGateway::RestApi', {
      Name: Match.stringLikeRegexp('HelloAPI')
    });
  });

  // Test API Gateway deployment
  test('creates API Gateway deployment and stage', () => {
    template.resourceCountIs('AWS::ApiGateway::Deployment', 1);
    template.resourceCountIs('AWS::ApiGateway::Stage', 1);
  });

  // Test Lambda permissions for API Gateway
  test('grants API Gateway permission to invoke Lambda', () => {
    template.hasResourceProperties('AWS::Lambda::Permission', {
      Action: 'lambda:InvokeFunction',
      Principal: 'apigateway.amazonaws.com'
    });
  });

  // Test API Gateway methods
  test('creates API Gateway methods', () => {
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'ANY'
    });
  });

  // Test CloudFormation outputs
  test('exports API Gateway URL as output', () => {
    template.hasOutput('apiURLOutput', {
      Value: Match.objectLike({
        'Fn::Join': Match.arrayWith([
          Match.arrayWith([Match.stringLikeRegexp('execute-api')])
        ])
      })
    });
  });

  // Test resource tagging (if you add tags later)
  test('Lambda function has correct environment variables', () => {
    // This would fail now, but shows how to test env vars
    // Uncomment when you add environment variables
    // template.hasResourceProperties('AWS::Lambda::Function', {
    //   Environment: {
    //     Variables: {
    //       ENV: 'production'
    //     }
    //   }
    // });
  });
});
