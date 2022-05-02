# Inception Health Technical Challenge

* This app creates an AWS EC2 instance used to run a "Hello World" docker container.

* The public IPv4 gets output to the terminal so that an SSH connection can be established with the instance.

* System Requirements:

    AWS CLI (aws-cli/2.5.2 Python/3.9.11 Darwin/21.4.0 exe/x86_64 prompt/off)
      - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

    AWS CDK (2.22.0 (build 1db4b16))
      - https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

    Node.js (v16.15.0)
      - https://github.com/nvm-sh/nvm#installing-and-updating

    DoTheDo.sh allows the user to pass an IAM key pair in as a parameter.
      - Place [your-key].pem file in the app home directory and replace "beau-henry-ec2-key"
        in DoTheDo.sh with [your-key] for proper IAM access during deployment.

* In the app home directory, launch the EC2 instance using "$ bash DoTheDo.sh"
