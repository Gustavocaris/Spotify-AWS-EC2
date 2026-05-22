resource "aws_ecr_repository" "ecr_site" {
  name                 = "PROD-repo"
  image_tag_mutability = "MUTABLE"
}