terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "instance" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "m6gd.xlarge"
}

