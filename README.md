<h1 align="center">
  Spotify-AWS-EC2
</h1>
<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-%2304D361">
  <img alt="Version: 1.0" src="https://img.shields.io/badge/version-1.0-yellowgreen">
</p>

# 📖 Contexto do Projeto

Este projeto foi desenvolvido para simular a evolução real de um ambiente moderno de desenvolvimento e deploy em cloud. Em muitos cenários, principalmente em pequenas equipes ou startups, é comum enfrentar problemas onde a aplicação funciona localmente, mas apresenta falhas ao ser publicada em servidores na AWS devido a diferenças de dependências, configurações e ambientes. Além disso, deploys realizados manualmente via SSH acabam consumindo tempo, aumentando riscos de erros humanos e dificultando a padronização do processo.

Para resolver esse problema inicial, a primeira etapa do laboratório utiliza Docker para containerizar a aplicação web, garantindo portabilidade e consistência entre ambientes. A imagem Docker é enviada para o Amazon ECR e posteriormente implantada manualmente em uma instância EC2 na AWS.

Com o crescimento da aplicação e da infraestrutura, surge um novo desafio: recriar ambientes rapidamente sem depender de configurações manuais no console da AWS. Esse processo frequentemente gera inconsistências entre ambientes, alterações não rastreadas e falhas operacionais. Para solucionar esse cenário, o projeto evolui para Infraestrutura como Código utilizando Terraform, permitindo provisionar recursos como EC2, ECR, IAM Roles e Security Groups de forma automatizada, padronizada e reproduzível através de arquivos HCL.

Na sequência, o laboratório aborda problemas comuns em ambientes com múltiplos desenvolvedores e mudanças frequentes no código. Deploys manuais passam a gerar gargalos, falta de auditabilidade e riscos de downtime. Para isso, são implementadas pipelines CI/CD utilizando GitHub Actions, automatizando processos de build, push de imagens Docker, execução de planos Terraform e deploys automatizados com maior controle e segurança operacional.

Por fim, a última etapa implementa uma pipeline completa de integração e entrega contínua seguindo boas práticas de DevSecOps. O projeto utiliza GitHub Actions para automatizar o build da aplicação, o envio da imagem para o Amazon ECR e o deploy automatizado na EC2 sempre que houver alterações na branch `main`. Além da automação, são aplicadas práticas modernas de segurança, como autenticação via OIDC, uso de credenciais temporárias e gerenciamento seguro de segredos, garantindo um fluxo mais seguro, auditável e eficiente.

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*



<hr>

# 🚀 Start - Hands on

A aplicação já chega pronta para o processo de deploy. Para este laboratório, foi utilizado como base um projeto refatorado de outro repositório meu ([link]), que foi adaptado e simplificado para uma versão mais leve, utilizando HTML, CSS e JavaScript puro. O foco do projeto não está no desenvolvimento da aplicação em si, mas sim em toda a jornada de containerização, provisionamento de infraestrutura e automação de deploy na AWS.

### Step 1: Containerização com Docker e Deploy Manual na AWS
- **Problema Real**: Imagine você em uma pequena equipe: O dev altera o código, mas no servidor AWS, "não funciona" por causa de dependências diferentes. Deploys envolvem SSH manual, levando a erros e tempo perdido.
- **Solução Prática**: Use Docker para "empacotar" o site em um container portátil. Crie um ECR na AWS, push a imagem e deploy manual na EC2.
- **Ferramentas Aprendidas**: Docker, AWS CLI, ECR, EC2, Security Groups.
- **Conexão**: Isso resolve o "funciona na minha máquina", mas ainda é manual – preparando o terreno para automação na Fase 2.
- **Desafio Inicial**: Tente deployar manualmente sem Docker e veja os erros de dependências.

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*


### Step 2: Automatização de Infraestrutura com Terraform (IaC) (Nível Intermediário)
- **Problema Real**: Agora a startup cresce: Você precisa recriar ambientes (dev/staging/prod) rapidamente, mas cliques manuais no console AWS causam inconsistências, erros e "drift" (mudanças não rastreadas). Um deploy de emergência falha porque uma configuração foi esquecida.
- **Solução Prática**: Trate a infra como código com Terraform. Declare recursos como EC2, ECR e IAM Roles em arquivos HCL, e o Terraform provisiona tudo automaticamente.
- **Ferramentas Aprendidas**: Terraform (init/plan/apply/destroy), backends remotos (S3 para state), outputs para integração.
- **Conexão**: Integra com o Docker do Projeto 1 – agora a infra é reproduzível, mas o deploy ainda requer SSH manual. Isso motiva a full automation na Fase 3.
- **Desafio Inicial**: Tente recriar manualmente o ambiente do Projeto 1 em uma nova região e note os pontos de dor.

*[Espaço para print: Diagrama da arquitetura do Projeto 2, mostrando arquivos Terraform → AWS Infra (EC2/ECR) → Deploy Docker]*

### Step 3: Automatização Completa com CI/CD (GitHub Actions + Terraform + Docker) (Nível Avançado)
- **Problema Real**: Com múltiplos devs, changes diárias viram caos: Deploys manuais criam gargalos, erros humanos e falta de auditabilidade. Um pico de tráfego exige update rápido, mas conflitos no Terraform state causam downtime.
- **Solução Prática**: Separe repos (app e infra), use GitHub Actions para pipelines CI/CD. Push no código dispara builds Docker, plans Terraform e deploys com aprovações manuais para segurança.
- **Ferramentas Aprendidas**: GitHub Actions (workflows YAML, secrets, aprovações), integração multi-repo.
- **Conexão**: Une tudo: Docker do Projeto 1 + Terraform do Projeto 2 em um fluxo automatizado. Agora, é um pipeline DevOps real, escalável para equipes.
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


