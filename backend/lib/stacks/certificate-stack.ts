import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";

export class CertificateStack extends cdk.Stack {
  constructor(
    scope: Construct,
    props: cdk.StackProps,
    stage: string,
    domain: string
  ) {
    super(scope, `${APP_PREFIX}-CertificateStack-${stage}`, props);

    // zone
    const zone = HostedZone.fromLookup(this, "baseZone", {
      domainName: domain,
    });

    new Certificate(this, `${APP_PREFIX}-Certificate`, {
      domainName: domain,
      validation: CertificateValidation.fromDns(zone),
    });

    new Certificate(this, `${APP_PREFIX}-Redirect-Certificate`, {
      domainName: `www.${domain}`,
      validation: CertificateValidation.fromDns(zone),
    });
  }
}
