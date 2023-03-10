terraform {
  required_version = ">= 0.12"
}

resource "aws_instance" "my-ec2-instance" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "m6id.xlarge"
}

