<h1 align="center">
  Spotify-AWS-EC2
</h1>
<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-%2304D361">
  <img alt="Version: 1.0" src="https://img.shields.io/badge/version-1.0-yellowgreen">
</p>

> Projeto de laboratório que simula a evolução real de um ambiente moderno de desenvolvimento e deploy em cloud, utilizando Docker, Terraform e GitHub Actions para automatizar o ciclo completo de entrega de uma aplicação frontend inspirada no Spotify.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura](#arquitetura)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Etapas do Laboratório](#etapas-do-laboratório)
  - [Step 1 — Containerização com Docker](#step-1--containerização-com-docker)
  - [Step 2 — Infraestrutura como Código com Terraform](#step-2--infraestrutura-como-código-com-terraform)
  - [Step 3 — CI/CD com GitHub Actions](#step-3--cicd-com-github-actions)
- [IAM Roles e Segurança](#iam-roles-e-segurança)
- [Pipelines CI/CD](#pipelines-cicd)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)

---

## Sobre o Projeto

Este projeto foi desenvolvido para simular a evolução real de um ambiente moderno de desenvolvimento e deploy em cloud. A aplicação consiste em uma **página frontend inspirada no Spotify**, servida via Nginx dentro de um container Docker e publicada na AWS.

O laboratório aborda de forma progressiva os principais desafios enfrentados por equipes de desenvolvimento:

| Problema Real | Solução Aplicada |
|---|---|
| "Funciona na minha máquina" | Docker — containerização da aplicação |
| Infraestrutura manual e inconsistente | Terraform — Infraestrutura como Código |
| Deploy manual, lento e propenso a erros | GitHub Actions — pipeline CI/CD automatizada |
| Credenciais expostas, sem auditoria | OIDC + IAM Roles com credenciais temporárias |

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                        │
│                                                                 │
│  ┌──────────────┐    Push to main    ┌──────────────────────┐   │
│  │  Developer   │ ────────────────►  │   GitHub Actions     │   │
│  └──────────────┘                    │  (CI/CD Pipeline)    │   │
│                                      └──────────┬───────────┘   │
└─────────────────────────────────────────────────┼───────────────┘
                                                  │ OIDC Token
                                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                          AWS Cloud                              │
│                                                                 │
│  ┌──────────────────┐         ┌─────────────────────────────┐   │
│  │    IAM Role      │ ◄───────│   Assume Role via OIDC      │   │
│  │ github-infra-role│         │  (sem credenciais estáticas)│   │
│  └────────┬─────────┘         └─────────────────────────────┘   │
│           │                                                     │
│           │ Permissões                                          │
│           ▼                                                     │
│  ┌──────────────────┐    Push   ┌──────────────────────────┐    │
│  │   Amazon ECR     │ ◄──────── │     Docker Build         │    │
│  │  (Image Registry)│           │  (Nginx + Frontend)      │    │
│  └────────┬─────────┘           └──────────────────────────┘    │
│           │                                                     │
│           │ docker pull                                         │
│           ▼                                                     │
│  ┌──────────────────┐           ┌──────────────────────────┐    │
│  │    Amazon EC2    │           │       Amazon S3          │    │
│  │  (Nginx/Docker)  │           │   (Terraform tfstate)    │    │
│  │                  │           └──────────────────────────┘    │
│  │  Port 80 (HTTP)  │                                           │
│  └──────────────────┘                                           │
│                                                                 │
│         Provisionado via Terraform (IaC)                        │
└─────────────────────────────────────────────────────────────────┘
```

**Fluxo resumido:**
1. O desenvolvedor realiza um push na branch `main`
2. O GitHub Actions dispara a pipeline automaticamente
3. A pipeline se autentica na AWS via OIDC (sem credenciais estáticas)
4. O Terraform provisiona ou atualiza a infraestrutura (EC2, ECR, IAM, Security Groups)
5. A imagem Docker é construída e enviada ao Amazon ECR
6. A EC2 realiza o pull da nova imagem e reinicia o container

---

## Estrutura do Repositório

```
SPOTIFY-AWS-EC2/
├── .github/
│   └── workflows/
│       ├── terraform.yaml          # Pipeline principal (infra + deploy)
│       └── terraform-destroy.yaml  # Pipeline para destruir a infraestrutura
│
├── Docker/
│   └── Dockerfile                  # Definição da imagem Nginx + Frontend
│
├── Frontend/
│   ├── src/                        # Assets e recursos estáticos
│   ├── index.html                  # Página principal (UI inspirada no Spotify)
│   └── script.js                   # Lógica frontend
│
├── Terraform/
│   ├── .terraform/                 # Cache local de providers (não versionado)
│   ├── backend.tf                  # Configuração do estado remoto (S3)
│   ├── provider.tf                 # Configuração do provider AWS
│   ├── ec2.tf                      # Recurso: instância EC2
│   ├── ecr.tf                      # Recurso: repositório Amazon ECR
│   ├── iam.tf                      # Recurso: IAM Roles e Policies
│   └── .terraform.lock.hcl        # Lock de versões dos providers
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Etapas do Laboratório

### Step 1 — Containerização com Docker

O primeiro desafio resolvido é o clássico problema de inconsistência entre ambientes. A aplicação é containerizada com Docker, garantindo que o comportamento seja idêntico em qualquer máquina ou servidor.

<div align="center">
<img src="https://github.com/user-attachments/assets/0ecc5fab-3ac5-4857-bdd3-1468111ea402" />
</div>

**Dockerfile:**

```dockerfile
FROM nginx:alpine

COPY Frontend/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Decisões técnicas:**

- `nginx:alpine` — imagem minimalista (~5MB), menor superfície de ataque e inicialização mais rápida
- `COPY Frontend/` — copia todos os arquivos estáticos diretamente para o diretório padrão do Nginx
- `daemon off` — mantém o processo Nginx em foreground, necessário para o container permanecer ativo

A imagem gerada é publicada no **Amazon ECR** e a primeira implantação é feita manualmente via SSH em uma instância EC2.

---

### Step 2 — Infraestrutura como Código com Terraform

Com o crescimento da infraestrutura, configurações manuais no console AWS se tornam insustentáveis. O Terraform resolve isso definindo toda a infraestrutura em arquivos HCL versionados.

<div align="center">
<img src="https://github.com/user-attachments/assets/332d2ffc-0d75-4424-a666-d21d9e17e08c" />
</div>

**Recursos provisionados:**

| Arquivo | Recurso AWS | Finalidade |
|---|---|---|
| `ec2.tf` | Amazon EC2 | Instância que hospeda o container Docker |
| `ecr.tf` | Amazon ECR | Registry privado para as imagens Docker |
| `iam.tf` | IAM Role + Policies | Controle de permissões e autenticação OIDC |
| `backend.tf` | Amazon S3 | Armazenamento remoto do `terraform.tfstate` |
| `provider.tf` | AWS Provider | Configuração da região e autenticação |

**Por que o estado remoto no S3 é crítico:**

Sem o `backend.tf` apontando para um bucket S3, o `terraform.tfstate` ficaria apenas na máquina local. Em um time, dois membros executando `terraform apply` simultaneamente poderiam corromper o estado da infraestrutura. O S3 com state locking via DynamoDB resolve esse problema, tornando o Terraform seguro para uso colaborativo.

---

### Step 3 — CI/CD com GitHub Actions

A etapa final automatiza completamente o ciclo de build, infraestrutura e deploy, eliminando intervenção manual e adicionando auditabilidade a cada alteração.

**Pipeline de Infraestrutura (`terraform.yaml`):**

```
Push na main
     │
     ▼
Checkout do código
     │
     ▼
Autenticação AWS via OIDC (sem senhas estáticas)
     │
     ▼
terraform init → validate → plan → apply*
     │
     ▼
Docker build → push para ECR
     │
     ▼
Deploy na EC2 (docker pull + run)

* apply só executa se apply == 'true' (proteção contra destruição acidental)
```

---

## IAM Roles e Segurança

Este é um dos aspectos mais importantes do projeto do ponto de vista de **DevSecOps**.

### O problema das credenciais estáticas

A abordagem tradicional de CI/CD armazena `AWS_ACCESS_KEY_ID` e `AWS_SECRET_ACCESS_KEY` como secrets no GitHub. Isso apresenta riscos sérios:

- Credenciais de longa duração — se vazarem, o acesso persiste até revogação manual
- Difícil auditoria — não há distinção clara de qual pipeline executou cada ação
- Rotação complexa — requer atualização manual em todos os repositórios

### A solução: OIDC + IAM Role com credenciais temporárias

O projeto utiliza **OpenID Connect (OIDC)** para autenticação federada entre o GitHub Actions e a AWS, eliminando completamente o uso de credenciais estáticas.

**Como funciona:**

```
GitHub Actions                    AWS
     │                              │
     │  1. Solicita OIDC Token      │
     │ ─────────────────────────►  │
     │                              │
     │  2. Token JWT temporário     │
     │ ◄─────────────────────────  │
     │                              │
     │  3. AssumeRoleWithWebIdentity│
     │     (apresenta o JWT)        │
     │ ─────────────────────────►  │
     │                              │
     │  4. Credenciais temporárias  │
     │     (válidas por ~1 hora)    │
     │ ◄─────────────────────────  │
     │                              │
     │  5. Executa ações na AWS     │
     │     com as credenciais temp. │
     │ ─────────────────────────►  │
```

**No workflow:**

```yaml
- name: "Configure AWS Credentials"
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-infra-role
    aws-region: sa-east-1
```

### Estrutura da IAM Role (`iam.tf`)

A role `github-infra-role` é composta por três elementos:

**1. Trust Policy (Política de Confiança)**

Define *quem* pode assumir a role. Neste caso, apenas o GitHub Actions do repositório correto:

```json
{
  "Effect": "Allow",
  "Principal": {
    "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
  },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringLike": {
      "token.actions.githubusercontent.com:sub": "repo:SEU_USUARIO/SPOTIFY-AWS-EC2:*"
    }
  }
}
```

**2. Permission Policy (Política de Permissões)**

Define *o que* a role pode fazer na AWS. Inclui permissões mínimas necessárias para:

- Criar e gerenciar instâncias EC2 e Security Groups
- Autenticar e publicar imagens no Amazon ECR
- Ler e escrever o estado do Terraform no S3
- Criar e atualizar IAM Roles (para o próprio provisionamento)

**3. Princípio do menor privilégio**

A role possui apenas as permissões estritamente necessárias para executar as pipelines. Nenhum acesso desnecessário é concedido, reduzindo a superfície de ataque em caso de comprometimento.

### Benefícios dessa abordagem

| Aspecto | Credenciais Estáticas | OIDC + IAM Role |
|---|---|---|
| Duração | Permanente até revogação | ~1 hora (temporária) |
| Risco de vazamento | Alto | Muito baixo |
| Auditoria no CloudTrail | Genérica | Identifica a pipeline exata |
| Rotação | Manual | Automática |
| Escopo | Irrestrito (usuário IAM) | Mínimo necessário (role) |

---

## Pipelines CI/CD

### `terraform.yaml` — Pipeline Principal

Disparada em push na branch `main`. Executa:

1. Autenticação OIDC na AWS
2. Inicialização e validação do Terraform
3. `terraform plan` — prévia das mudanças
4. `terraform apply` — execução condicional (requer `apply: true` no input manual)
5. Build e push da imagem Docker para o ECR
6. Deploy do container na instância EC2

### `terraform-destroy.yaml` — Pipeline de Destruição

Pipeline auxiliar acionada manualmente para destruir toda a infraestrutura provisionada com `terraform destroy`. Útil para gerenciamento de custos em ambientes de laboratório.

---

## Tecnologias Utilizadas

- **Docker** — containerização da aplicação
- **Nginx (Alpine)** — servidor web leve para arquivos estáticos
- **Amazon ECR** — registry privado de imagens Docker
- **Amazon EC2** — instância de computação na AWS
- **Amazon S3** — armazenamento do Terraform state
- **Terraform** — provisionamento de infraestrutura como código
- **GitHub Actions** — automação de CI/CD
- **AWS IAM + OIDC** — autenticação segura sem credenciais estáticas

---

## Pré-requisitos

Para reproduzir este projeto, você precisará de:

- Conta AWS com permissões administrativas
- GitHub Actions habilitado no repositório
- AWS CLI configurada localmente
- Terraform >= 1.0 instalado
- Docker instalado e em execução
- Bucket S3 criado previamente para o Terraform backend

---

> Desenvolvido como projeto de laboratório DevOps — explorando containerização, IaC e CI/CD com boas práticas de segurança em cloud.


<div align="center">
<img src="https://github.com/user-attachments/assets/332d2ffc-0d75-4424-a666-d21d9e17e08c" />
</div>