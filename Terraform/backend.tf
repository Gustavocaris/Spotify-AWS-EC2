terraform {
  backend "s3" {
    bucket = "gustavocaris-sa-east-1-terraform-statefile"
    key = "site/terraform.tfstate"
    region = "sa-east-1"
    encrypt = true
  }
}