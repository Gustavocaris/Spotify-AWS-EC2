resource "aws_ecr_repository" "foo" {
  name                 = "PROD-repo"
  image_tag_mutability = "MUTABLE"
}