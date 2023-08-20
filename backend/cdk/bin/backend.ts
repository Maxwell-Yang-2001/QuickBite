#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { APIStack } from "../lib/stacks/api-stack";
import { DDBStack } from "../lib/stacks/ddb-stack";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { CognitoStack } from "../lib/stacks/cognito-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION, // should preferrably be "us-east-1" for ease of management
};

const domain = process.env.CDK_CUSTOM_DOMAIN;
const hostedZoneId = process.env.CDK_HOSTED_ZONE_ID;

new APIStack(app, { env });

new DDBStack(app, { env });

new FrontendStack(app, { env }, domain, hostedZoneId);

new CognitoStack(app, { env });
