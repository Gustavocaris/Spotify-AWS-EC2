
# Role
resource "aws_iam_role" "ecr_ec2_role" {
  name = "ECR-EC2-Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Anexa a policy de acesso ao ECR
resource "aws_iam_role_policy_attachment" "ecr_access" {
  role       = aws_iam_role.ecr_ec2_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# Instance Profile (necessário para anexar à EC2)
resource "aws_iam_instance_profile" "ecr_ec2_profile" {
  name = "ECR-EC2-Role"
  role = aws_iam_role.ecr_ec2_role.name
}
