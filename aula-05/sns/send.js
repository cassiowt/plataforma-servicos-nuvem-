// Importar os pacotes necessários
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Configurar o cliente SNS
const snsClient = new SNSClient({
  region: "us-east-2", // Substitua pela sua região
  // As credenciais são lidas automaticamente das variáveis de ambiente ou do arquivo ~/.aws/credentials
});

// Função assíncrona para publicar uma mensagem
async function publishMessage() {
  const params = {
    Message: "Olá, esta é uma mensagem de teste do SNS com SDK v3!", // A mensagem que você deseja enviar
    TopicArn: "arn:aws:sns:us-east-2:489323066454:PlataformaTopic", // ARN do seu tópico SNS
  };

  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Mensagem enviada com sucesso, ID:", data.MessageId);
  } catch (err) {
    console.error("Erro ao enviar a mensagem", err);
  }
}

// Chamar a função para publicar uma mensagem
publishMessage();

// aws sns publish --topic-arn "arn:aws:sns:us-east-2:489323066454:PlataformaTopic" --message "Test message" --region us-east-2