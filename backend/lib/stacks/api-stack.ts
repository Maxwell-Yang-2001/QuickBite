import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";

export class APIStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps, stage: any) {
    super(scope, `${APP_PREFIX}-APIStack-${stage}`, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'BackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
