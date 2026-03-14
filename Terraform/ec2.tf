resource "aws_instance" "website_server" {
  ami                    = "ami-0b016c703b95ecbe4" #Amazon Linux 2 AMI
  instance_type          = "t2.micro"
  key_name               = "chave-site-prod"
  vpc_security_group_ids = [aws_security_group.website_sg.id]
  iam_instance_profile   = "ECR-EC2-Role"

  tags = {
    Name        = "website-server"
    Provisioned = "Terraform"
    Cliente     = "Maria"
  }
}