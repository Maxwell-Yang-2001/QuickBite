#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { APIStack } from "../lib/stacks/api-stack";
import { DDBStack } from "../lib/stacks/ddb-stack";
import { FrontendStack } from "../lib/stacks/frontend-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const stage = process.env.CDK_DEPLOYMENT_STAGE === "prod" ? "prod" : "devo";
const domain =
  stage === "prod" && process.env.CDK_CUSTOM_DOMAIN
    ? process.env.CDK_CUSTOM_DOMAIN
    : undefined;

new APIStack(app, { env }, stage);

new DDBStack(app, { env }, stage);

// As certificates need to be in us-east-1 and all other stack assets are region-agnostic, only deploy to us-east-1
if (env.region === "us-east-1") {
  new FrontendStack(app, { env }, stage, domain);
}
