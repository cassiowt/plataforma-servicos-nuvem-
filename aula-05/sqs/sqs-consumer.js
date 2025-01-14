const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const sqsClient = new SQSClient({ region: "us-east-2" });

const params = {
  QueueUrl: "https://sqs.us-east-2.amazonaws.com/489323066454/LogisticaRastreamentoQueue", // Substitua pelos seus valores
  MessageBody: "Your message text"
};

const run = async () => {
  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    console.log("Success, message sent. MessageId:", data.MessageId);
  } catch (err) {
    console.log("Error", err);
  }
};

run();

//aws sqs send-message --queue-url https://sqs.us-east-2.amazonaws.com/489323066454/LogisticaRastreamentoQueue --message-body "status: entregue, pacote: 123, timestamp: 1617702769" ;

