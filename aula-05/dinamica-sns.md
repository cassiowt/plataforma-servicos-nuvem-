# Dinâmica Amazon Simple Notification Service 
### Passo 1: Criar um Tópico SNS
* **Acesse** o AWS Management Console e faça login.
* **Encontre o serviço SNS: **No campo de busca, digite “SNS” e clique em Simple Notification Service para abrir o painel do SNS.
* **Criar novo tópico:** Clique em “Create topic”.
* **Escolha o tipo de tópico:** Selecione “Standard” para um tópico que permite entrega de mensagens múltiplas e em qualquer ordem, ou “FIFO” para entrega ordenada e sem duplicatas. Para este tutorial, escolha “Standard”.
* **Configure o tópico:**
    * Name: Dê um nome único ao seu tópico.
    * Display name: (Opcional) Um nome curto que será mostrado nos assuntos das notificações por email ou SMS.
* **Crie o tópico:** Clique em “Create topic”.

## Passo 2: Inscrever um Email como Assinante
* **Abra o tópico criado:** Após criar o tópico, você será redirecionado à página do tópico. Clique no nome do tópico que você acabou de criar. Clique em “**Create subscription**”.
* **Configure a assinatura:**
* Protocol: Selecione “Email”.
    * Endpoint: Insira o endereço de email que receberá as notificações.
    * Crie a assinatura: Clique em “**Create subscription**”.
* **Confirme a assinatura:** Um email será enviado ao endereço fornecido com um link para confirmar a assinatura. **Clique no link para confirmar**.

## Passo 3: Enviar uma Mensagem de Teste
* **Volte ao seu tópico SNS**: No painel do SNS, clique no tópico ao qual você inscreveu o email.
* **Publicar uma mensagem**: Clique em “Publish message”.
* **Configure a mensagem**:
    * Subject: (Opcional para emails) Insira um assunto para a mensagem.
    * Message body: Digite a mensagem que deseja enviar. Você pode alternar entre o modo “Text” e “JSON”.
* **Publicar a mensagem**: Clique em “**Publish message**”.

## Passo 4: Verificar o Email
> **Cheque seu email**: Você deverá receber a mensagem enviada do SNS. Pode haver um pequeno atraso, então aguarde alguns minutos se não aparecer imediatamente.