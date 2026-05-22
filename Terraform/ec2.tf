resource "aws_instance" "website_server" {
  ami                    = "ami-01a675202498c5589" #Amazon Linux 2 AMI
  instance_type          = "t3.micro"
  key_name               = "key-site-prod"
  vpc_security_group_ids = [aws_security_group.website_sg.id]
  iam_instance_profile = aws_iam_instance_profile.ecr_ec2_profile.name

  tags = {
    Name        = "website-server"
    Provisioned = "Terraform"
    Cliente     = "GuGu"
  }
}


resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.website_sg.id
  cidr_ipv4         = "201.21.160.22/32"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.website_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_ingress_rule" "allow_https" {
  security_group_id = aws_security_group.website_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_egress_rule" "allow_all_outbound" {
  security_group_id = aws_security_group.website_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = -1
}

resource "aws_security_group" "website_sg" {
  name        = "website-sg"
  description = "Security group para o website server"

  tags = {
    Name        = "website-sg"
    Provisioned = "Terraform"
  }
}
