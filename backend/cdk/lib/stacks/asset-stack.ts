import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import { BlockPublicAccess, Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3";

export class AssetStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps) {
    super(scope, `${APP_PREFIX}-AssetStack`, props);

    const bucketName = `${APP_PREFIX}-Asset-Bucket`;

    new Bucket(this, bucketName, {
      bucketName: bucketName.toLowerCase(),
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });
  }
}
