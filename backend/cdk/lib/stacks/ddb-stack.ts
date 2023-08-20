import * as cdk from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import { Bucket, BucketAccessControl } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

export class DDBStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps) {
    super(scope, `${APP_PREFIX}-DDBStack`, props);

    // DynamoDB tables

    let tableName = `${APP_PREFIX}-Customers`;

    const customersTable = new Table(this, tableName, {
      tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    tableName = `${APP_PREFIX}-Orders`;

    const ordersTable = new Table(this, tableName, {
      tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    tableName = `${APP_PREFIX}-Stores`;

    const storesTable = new Table(this, tableName, {
      tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: { name: "name", type: AttributeType.STRING },
    });

    tableName = `${APP_PREFIX}-Drivers`;

    const driversTable = new Table(this, tableName, {
      tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    // S3 Bucket (1 bucket containing initial data for all tables)

    const bucketName = `${APP_PREFIX}-DDB-Initial-Data-Bucket`;

    const bucket = new Bucket(this, bucketName, {
      bucketName: bucketName.toLowerCase(),
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    new BucketDeployment(
      this,
      `${APP_PREFIX}-DDB-Initial-Data-Bucket-Deployment`,
      {
        sources: [Source.asset("../ddb")],
        destinationBucket: bucket,
      }
    );

    // Lambda

    let environment: { [key: string]: string } = {
      BUCKET_NAME: bucketName.toLowerCase(),
    };
    if (props.env?.region) {
      environment.REGION = props.env?.region;
    }

    const initiator = new Function(
      this,
      `${APP_PREFIX}-DDB-Initiator`,
      {
        runtime: Runtime.NODEJS_18_X,
        code: Code.fromAsset("../lambda/src"),
        handler: "ddb-initiator.main",
        environment,
      }
    );

    customersTable.grantWriteData(initiator);
    ordersTable.grantWriteData(initiator);
    storesTable.grantWriteData(initiator);
    driversTable.grantWriteData(initiator);

    bucket.grantRead(initiator);
  }
}
