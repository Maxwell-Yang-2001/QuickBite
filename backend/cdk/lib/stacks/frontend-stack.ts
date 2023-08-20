import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import {
  CloudFrontWebDistribution,
  OriginProtocolPolicy,
  ViewerCertificate,
} from "aws-cdk-lib/aws-cloudfront";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";

export class FrontendStack extends cdk.Stack {
  constructor(
    scope: Construct,
    props: cdk.StackProps,
    domain?: string,
    hostedZoneId?: string
  ) {
    super(scope, `${APP_PREFIX}-FrontendStack`, props);

    const bucket = new Bucket(this, `${APP_PREFIX}-Web-Bucket`, {
      bucketName: domain,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    new BucketDeployment(this, `${APP_PREFIX}-Web-Bucket-Deployment`, {
      sources: [Source.asset("../../frontend/build")],
      destinationBucket: bucket,
    });

    // if no domain or hosted zone s given, return after CloudFront

    if (!domain || !hostedZoneId) {
      new CloudFrontWebDistribution(this, `${APP_PREFIX}-CloudFront`, {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      });
      return;
    }

    // Zone

    const zone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId,
      zoneName: "quick-bite.net",
    });

    // Certificate

    const certificate = new Certificate(this, `${APP_PREFIX}-Certificate`, {
      domainName: domain,
      validation: CertificateValidation.fromDns(zone),
    });

    // CloudFront

    const distribution = new CloudFrontWebDistribution(
      this,
      `${APP_PREFIX}-CloudFront`,
      {
        originConfigs: [
          {
            customOriginSource: {
              domainName: bucket.bucketWebsiteDomainName,
              originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
          aliases: [domain],
        }),
      }
    );

    // DNS

    new ARecord(this, `${APP_PREFIX}-Alias`, {
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });
  }
}
