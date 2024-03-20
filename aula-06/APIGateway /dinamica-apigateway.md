# AWS API Gateway Pets API Tutorial

## Passo 1: Acessar o AWS Management Console
- Acesse e navegue até o serviço API Gateway.

## Passo 2: Criar uma Nova API
- Clique em “Create API”.
- Selecione “New API” e nomeie-a `PetsAPI`.
- Confirme com “Create API”.

## Passo 3: Definir Recursos e Métodos
- Crie um recurso chamado `pets`.
- No recurso `pets`, crie um método `GET` para listar todos os pets.
- Adicione um método `POST` ao recurso `pets` para adicionar um novo pet.
- Crie um recurso filho `{id}` para ações em um pet específico.
- No recurso `{id}`, adicione um método `GET` para obter informações de um pet pelo ID.

## Passo 4: Configurar Integrações
- Configure o método `GET` e `POST` para integrar com o seu back-end.

## Passo 5: Implantar a API
- Crie um estágio, como `dev`.
- Implantar sua API e anote a URL de invocação.

## Passo 6: Testar a API
- Teste sua API usando a URL de invocação em uma ferramenta como Postman.


