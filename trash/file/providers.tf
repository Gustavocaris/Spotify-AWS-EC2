provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "cloudscript-eks-challenge"
      Environment = "dev"
      ManagedBy   = "Terraform"
    }
  }
}
