<h1 align="center">
  Spotify-AWS-EC2
</h1>
Let’s take a source code that we had already created, build an image, and deploy it to an EC2 instance on Amazon so the end customer can use it
<p align="center">

  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-%2304D361">
  <img alt="Version: 1.0" src="https://img.shields.io/badge/version-1.0-yellowgreen">

</p>

<hr>

## 1 - Introduction
Este repositório contém 3 pastas, cada uma com um projeto independente, mas interligado:
- **projeto-devops-fase-1**: O básico – containerize e deploy manual de um site estático na AWS.
- **projeto-devops-fase-2**: Adicione automação de infraestrutura com Terraform (IaC).
- **projeto-devops-fase-3**: Full automation com CI/CD usando GitHub Actions + Terraform + Docker.

<hr>

## 2 - Imag da Arquitetura Geral(importante detalhar bem esse fluxo):

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*

<hr>

## ⚠️Steps 1/3

##  Step 01: Containerização com Docker e Deploy Manual na AWS (Nível Básico)

Vamos pegar um website simples (adicionar o link do meu repo aqui e explicar que refatorei e deixei menor o codigo fonte) (HTML/CSS/JS) e deployá-lo na AWS. Mas o foco não é o site – é o processo DevOps ao redor dele. Cada fase resolve problemas da anterior, adicionando camadas de automação.

### Projeto 1: Containerização com Docker e Deploy Manual na AWS (Nível Básico)
- **Problema Real**: Imagine você em uma pequena equipe: O dev altera o código, mas no servidor AWS, "não funciona" por causa de dependências diferentes. Deploys envolvem SSH manual, levando a erros e tempo perdido.
- **Solução Prática**: Use Docker para "empacotar" o site em um container portátil. Crie um ECR na AWS, push a imagem e deploy manual na EC2.
- **Ferramentas Aprendidas**: Docker, AWS CLI, ECR, EC2, Security Groups.
- **Conexão**: Isso resolve o "funciona na minha máquina", mas ainda é manual – preparando o terreno para automação na Fase 2.
- **Tempo Estimado**: 2-3 horas.
- **Desafio Inicial**: Tente deployar manualmente sem Docker e veja os erros de dependências.

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*


### Projeto 2: Automatização de Infraestrutura com Terraform (IaC) (Nível Intermediário)
- **Problema Real**: Agora a startup cresce: Você precisa recriar ambientes (dev/staging/prod) rapidamente, mas cliques manuais no console AWS causam inconsistências, erros e "drift" (mudanças não rastreadas). Um deploy de emergência falha porque uma configuração foi esquecida.
- **Solução Prática**: Trate a infra como código com Terraform. Declare recursos como EC2, ECR e IAM Roles em arquivos HCL, e o Terraform provisiona tudo automaticamente.
- **Ferramentas Aprendidas**: Terraform (init/plan/apply/destroy), backends remotos (S3 para state), outputs para integração.
- **Conexão**: Integra com o Docker do Projeto 1 – agora a infra é reproduzível, mas o deploy ainda requer SSH manual. Isso motiva a full automation na Fase 3.
- **Tempo Estimado**: 2-4 horas.
- **Desafio Inicial**: Tente recriar manualmente o ambiente do Projeto 1 em uma nova região e note os pontos de dor.

*[Espaço para print: Diagrama da arquitetura do Projeto 2, mostrando arquivos Terraform → AWS Infra (EC2/ECR) → Deploy Docker]*

### Projeto 3: Automatização Completa com CI/CD (GitHub Actions + Terraform + Docker) (Nível Avançado)
- **Problema Real**: Com múltiplos devs, changes diárias viram caos: Deploys manuais criam gargalos, erros humanos e falta de auditabilidade. Um pico de tráfego exige update rápido, mas conflitos no Terraform state causam downtime.
- **Solução Prática**: Separe repos (app e infra), use GitHub Actions para pipelines CI/CD. Push no código dispara builds Docker, plans Terraform e deploys com aprovações manuais para segurança.
- **Ferramentas Aprendidas**: GitHub Actions (workflows YAML, secrets, aprovações), integração multi-repo.
- **Conexão**: Une tudo: Docker do Projeto 1 + Terraform do Projeto 2 em um fluxo automatizado. Agora, é um pipeline DevOps real, escalável para equipes.
- **Tempo Estimado**: 3-5 horas.
- **Desafio Inicial**: Simule deploys simultâneos manuais no setup do Projeto 2 e veja conflitos.

*[Espaço para print: Diagrama completo da arquitetura do Projeto 3, mostrando Repos GitHub → Actions CI/CD → AWS Infra + Deploy]*

### 🔧 Como Começar
1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/marialazara/devops-projects.git
   cd seu-repo-devops
   ```
2. **Escolha uma Fase**: Comece pela pasta `projeto-devops-fase-1` e avance. Cada README tem pré-requisitos, passos e troubleshooting.
3. **Ambiente**: Certifique-se de ter uma conta AWS gratuita (cuidado com custos – use Free Tier). Instale ferramentas como Docker, Terraform e AWS CLI conforme descrito.
4. **Dicas Gerais**:
   - Use VS Code para editar arquivos.
   - Sempre teste localmente antes de apply/destroy.
   - Limpe recursos AWS no final para evitar custos!
5. **Personalize**: Substitua placeholders (ex.: regiões AWS, nomes de repos) com os seus.


