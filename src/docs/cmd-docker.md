# Comandos do Docker

## Verificar a versão do docker

``docker -v``


## Intalar uma imagen do Docker Hub
- Usei como exemplo a imagem do node alpine da versão 20
`` docker pull node:20-alpine ``

## Verificar todas as imagens instaladas no Docker

``docker images``


## Rodar a imagem(Criar um container)

``docker run -it --name node-dnc node:20-alpine``

## Mostrar todos os container que estão rodando no Docker

``docker ps``


## Mostrar todos os container que estão rodando ou não no Docker

``docker ps -a``


## Para remover uma imagem

``docker rmi node:20-alpine``

## Para remover um container

``docker rm <id_do_container>``
