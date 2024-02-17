**Passo 1:** Preparar o Website Estático
* Criar o Conteúdo do Website: Desenvolva seu website estático. Para esta dinâmica, você pode criar um simples arquivo HTML chamado index.html. Exemplo de conteúdo:
html

```htm
<!DOCTYPE html>
<html>
<head>
    <title>Meu Website na CloudFront</title>
</head>
<body>
    <h1>Bem-vindo ao Meu Website Hospedado via AWS CloudFront!</h1>
    <p>Este é um teste de conteúdo distribuído globalmente.</p>
</body>
</html>
```
**Passo 2:** Configurar o Amazon S3
* **Criar** um Bucket no S3: Acesse o console da AWS, vá até o serviço S3 e crie um novo bucket. **Desmarque** a opção "Bloquear todo o acesso público" e **aceite** as configurações padrão. Edite a Política do Bucket e adicione  as pólieces, Lembre-se de dar um nome único ao seu bucket.

* **Upload** do Conteúdo: Faça o upload do seu arquivo index.html para o bucket.

* **Configurar** o Bucket para Hospedagem de Website: Na aba "Propriedades" do bucket, ative a opção "Hospedagem de site estático", defina o index.html como documento de índice.

**Passo 3:** Criar uma Distribuição CloudFront
* **Acessar o CloudFron**t: No console da AWS, vá até o serviço CloudFront e clique em "Criar distribuição".
* **Configurar** a Origem: Escolha seu bucket S3 como origem. Use o endpoint do bucket que não inclui o nome do bucket no domínio (por exemplo, s3-website-us-east-1.amazonaws.com).
* Configurações Adicionais: **Mantenha** as configurações padrão, mas preste atenção à política de cache e à distribuição de TLS/SSL conforme necessário.
Lançar a Distribuição: Após configurar, clique em "Criar distribuição". O processo pode levar alguns minutos.

**Passo 4:** Testar o Acesso ao Website
* **Obter** o Domínio CloudFront: Após a distribuição estar ativa, copie o domínio fornecido pelo CloudFront (por exemplo, d1234.cloudfront.net).
* **Acessar** o Website: Cole o domínio em seu navegador. Você deverá ver seu website sendo servido através do CloudFront, com o conteúdo entregue pelo ponto de presença (PoP) mais próximo.
