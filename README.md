<h1 align="center">
  Spotify-AWS-EC2
</h1>
Let’s take a source code that we had already created, build an image, and deploy it to an EC2 instance on Amazon so the end customer can use it
<p align="center">

  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-%2304D361">
  <img alt="Version: 1.0" src="https://img.shields.io/badge/version-1.0-yellowgreen">

</p>

<hr>

# 🟢Imag da Arquitetura Geral(importante detalhar bem esse fluxo):

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*

# 🟢Step 01: Containerização com Docker e Deploy Manual na AWS (Nível Básico)

Vamos pegar um website simples (adicionar o link do meu repo aqui e explicar que refatorei e deixei menor o codigo fonte) (HTML/CSS/JS) e deployá-lo na AWS. Mas o foco não é o site – é o processo DevOps ao redor dele. Cada fase resolve problemas da anterior, adicionando camadas de automação.

### Projeto 1: Containerização com Docker e Deploy Manual na AWS (Nível Básico)
- **Problema Real**: Imagine você em uma pequena equipe: O dev altera o código, mas no servidor AWS, "não funciona" por causa de dependências diferentes. Deploys envolvem SSH manual, levando a erros e tempo perdido.
- **Solução Prática**: Use Docker para "empacotar" o site em um container portátil. Crie um ECR na AWS, push a imagem e deploy manual na EC2.
- **Ferramentas Aprendidas**: Docker, AWS CLI, ECR, EC2, Security Groups.
- **Conexão**: Isso resolve o "funciona na minha máquina", mas ainda é manual – preparando o terreno para automação na Fase 2.
- **Tempo Estimado**: 2-3 horas.
- **Desafio Inicial**: Tente deployar manualmente sem Docker e veja os erros de dependências.

*[Espaço para print: Diagrama simples da arquitetura do Projeto 1, mostrando código local → Docker → ECR → EC2 → Browser]*


