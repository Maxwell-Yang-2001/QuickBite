import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import { UserPool, VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";

export class CognitoStack extends cdk.Stack {
  constructor(scope: Construct, props: cdk.StackProps) {
    super(scope, `${APP_PREFIX}-CognitoStack`, props);

    new UserPool(this, `${APP_PREFIX}-UserPool`, {
      userPoolName: `${APP_PREFIX}-UserPool`,
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: `Verify your email for your ${APP_PREFIX} account`,
        emailBody: `Thanks for your interest to sign up for ${APP_PREFIX}"! Your verification code is {####}`,
        emailStyle: VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
        email: {
          required: true,
          mutable: false,
        },
        phoneNumber: {
          required: true,
          mutable: true,
        },
        address: {
          required: true,
          mutable: true,
        },
      },
      signInCaseSensitive: true,
      signInAliases: {
        username: true,
        email: true,
        preferredUsername: true,
      },
    });
  }
}
