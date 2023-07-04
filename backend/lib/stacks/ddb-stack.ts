import * as cdk from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import {
  AccountPrincipal,
  PolicyDocument,
  PolicyStatement,
  Role,
} from "aws-cdk-lib/aws-iam";

export class DDBStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps, stage: string) {
    super(scope, `${APP_PREFIX}-DDBStack-${stage}`, props);

    // create each table
    let tableName = `${APP_PREFIX}-Customers-${stage}`;

    const customersTable = new Table(this, tableName, {
      tableName,
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      partitionKey: { name: "id", type: AttributeType.STRING },
    });

    const roleName = `${APP_PREFIX}-DDBStack-Accessor-${stage}`;

    // create an accessor role that can access all tables
    new Role(this, roleName, {
      assumedBy: new AccountPrincipal(props.env?.account),
      roleName,
      inlinePolicies: {
        accessorPolicy: new PolicyDocument({
          statements: [
            PolicyStatement.fromJson({
              Sid: "DDBAccessor",
              Effect: "Allow",
              Action: [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:Query",
              ],
              Resource: [customersTable.tableArn],
            }),
          ],
        }),
      },
    });
  }
}
