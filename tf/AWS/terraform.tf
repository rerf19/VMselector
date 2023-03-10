provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "instance" {
  ami           = "ami-0fd2c44049dd805b8"
  instance_type = "i2.2xlarge"
}

