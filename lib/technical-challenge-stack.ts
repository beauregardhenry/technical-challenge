import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { readFileSync } from 'fs';

export class TechnicalChallengeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create VPC to hold the EC2 instance
    const vpc = new ec2.Vpc(this, 'tech-challenge-vpc', {
      cidr: '10.0.0.0/16',
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });

    // create a security group for the EC2 instance
    const techChallengeSG = new ec2.SecurityGroup(this, 'tech-challenge-sg', {
      vpc: vpc,
      allowAllOutbound: true,
    });

    // allow SSH access
    techChallengeSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'allow all inbound SSH connections',
    );

    // allow HTTP access
    techChallengeSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'allow all inbound HTTP connections',
    );

    // create a Role for the EC2 instance
    const techChallengeRole = new iam.Role(this, 'tech-challenge-role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'),
      ],
    });

    // create EC2 instance
    const techChallengeEC2Instance = new ec2.Instance(this, 'tech-challenge-ec2-instance', {
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      role: techChallengeRole,
      securityGroup: techChallengeSG,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      keyName: 'beau-henry',
    });

    // display public IPv4 address for the generated EC2 instance
    new cdk.CfnOutput(this, 'publicIPv4', {
      value: techChallengeEC2Instance.instancePublicIp,
    });

    // load application script
    const applicationScript = readFileSync('./lib/application.sh', 'utf8');

    // add application script to the instance
    techChallengeEC2Instance.addUserData(applicationScript);

  }
}
