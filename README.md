# Hello CDK

A simple AWS CDK application demonstrating a serverless API using Lambda and API Gateway.

## Architecture

- **AWS Lambda** - Node.js 20.x function written in TypeScript
- **API Gateway** - REST API with CORS enabled
- **Infrastructure as Code** - Defined using AWS CDK

## Prerequisites

- Node.js 20.x or later
- AWS CLI configured with credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

## Project Structure

```
hello-cdk/
├── lambda/              # Lambda function code (TypeScript)
├── lib/                 # CDK infrastructure code
├── bin/                 # CDK app entry point
├── test/                # Unit tests
└── cdk.out/             # Generated CloudFormation templates
```

## Installation

```bash
npm install
```

## Configuration

Set your AWS profile before deploying:

```bash
export AWS_PROFILE=your-profile-name
```

The stack uses the default region from your AWS configuration.

## Deployment

Build and deploy the stack:

```bash
npm run build
cdk bootstrap  # Only needed once per account/region
cdk deploy
```

## Testing

Run the test suite:

```bash
npm test
```

Update test snapshots:

```bash
npm test -- -u
```

## Usage

After deployment, the API URL will be displayed in the output. Test it with:

```bash
curl https://your-api-id.execute-api.region.amazonaws.com/prod/
```

Expected response:

```json
{
  "message": "Hello, world",
  "timestamp": "2026-02-05T11:25:35.489Z",
  "path": "/"
}
```

## Local Development

The Lambda function code is in `lambda/index.ts`. After making changes:

```bash
npm run build
cdk deploy
```

## Cleanup

Remove all deployed resources:

```bash
cdk destroy
```

## Tech Stack

- AWS CDK v2
- TypeScript
- Node.js 20.x
- esbuild (for Lambda bundling)
- Jest (for testing)

## License

MIT
