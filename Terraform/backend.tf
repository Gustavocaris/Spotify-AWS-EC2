terraform {
  backend "local" {}
}

//  Deixando o backend local para confirmar o destroy e não ter que lidar com o statefile remoto, 
//  já que o objetivo é destruir a infraestrutura criada. 
//  O backend remoto é mais recomendado para projetos maiores e com múltiplos colaboradores, onde o controle do statefile é crucial para evitar conflitos e garantir a integridade do estado da infraestrutura.
/*
terraform {
  backend "s3" {
    bucket = "gustavocaris-sa-east-1-terraform-statefile"
    key = "site/terraform.tfstate"
    region = "sa-east-1"
    encrypt = true
  }
}
*/