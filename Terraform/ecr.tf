resource "aws_ecr_repository" "foo" {
  name                 = "prod-repo"
  image_tag_mutability = "MUTABLE"
}