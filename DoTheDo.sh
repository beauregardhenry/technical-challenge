#!/bin/sh
cdk synth
cdk bootstrap
cdk deploy --parameters keypair="beau-henry-ec2-key"
