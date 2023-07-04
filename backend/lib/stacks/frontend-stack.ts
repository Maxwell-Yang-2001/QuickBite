import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { APP_PREFIX } from "../common";
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
  RedirectProtocol,
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
    stage: string,
    domain?: string
  ) {
    super(scope, `${APP_PREFIX}-FrontendStack-${stage}`, props);

    const bucket = new Bucket(this, `${APP_PREFIX}-Web-Bucket-${stage}`, {
      bucketName: domain,
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    new BucketDeployment(this, `${APP_PREFIX}-Web-Bucket-Deployment-${stage}`, {
      sources: [Source.asset("../frontend/build")],
      destinationBucket: bucket,
    });

    // if no domain is given, return after CloudFront

    if (!domain) {
      new CloudFrontWebDistribution(this, `${APP_PREFIX}-CloudFront-${stage}`, {
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

    // second bucket to redirect from www if domain is given

    const indirectBucket = new Bucket(
      this,
      `${APP_PREFIX}-Web-Indirect-Bucket-${stage}`,
      {
        bucketName: `www.${domain}`,
        publicReadAccess: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        websiteRedirect: {
          hostName: domain,
          protocol: RedirectProtocol.HTTP,
        },
        blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
        accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      }
    );

    // Zone

    const zone = HostedZone.fromLookup(this, "baseZone", {
      domainName: domain,
    });

    // Certificate

    const certificate = new Certificate(this, `${APP_PREFIX}-Certificate`, {
      domainName: domain,
      validation: CertificateValidation.fromDns(zone),
    });

    const redirectCertificate = new Certificate(
      this,
      `${APP_PREFIX}-Redirect-Certificate`,
      {
        domainName: `www.${domain}`,
        validation: CertificateValidation.fromDns(zone),
      }
    );

    // CloudFront

    const distribution = new CloudFrontWebDistribution(
      this,
      `${APP_PREFIX}-CloudFront-${stage}`,
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

    const redirectDistribution = new CloudFrontWebDistribution(
      this,
      `${APP_PREFIX}-Indirect-CloudFront-${stage}`,
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: indirectBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        viewerCertificate: ViewerCertificate.fromAcmCertificate(
          redirectCertificate,
          { aliases: [`www.${domain}`] }
        ),
      }
    );

    // DNS

    new ARecord(this, `${APP_PREFIX}-Alias`, {
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone,
    });

    new ARecord(this, `${APP_PREFIX}-Redirect-Alias`, {
      recordName: "www",
      target: RecordTarget.fromAlias(
        new CloudFrontTarget(redirectDistribution)
      ),
      zone,
    });
  }
}
