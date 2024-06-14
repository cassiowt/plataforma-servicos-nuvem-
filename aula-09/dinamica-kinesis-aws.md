### Tutorial de Uso do Amazon Kinesis 
Amazon Kinesis é um serviço de processamento de dados em tempo real que permite coletar, processar e analisar fluxos de dados em tempo real. Este tutorial abrange a configuração e uso do Amazon Kinesis para coletar e processar dados. 

#### Passo 1: Configuração do Amazon Kinesis 

1. **Criar um Stream do Kinesis:** 
* Acesse o console do AWS Management e vá para o serviço Amazon Kinesis. 
* Selecione "Kinesis Data Streams". 
* Clique em "Create Kinesis stream". 
* Insira um nome para o stream (ex: `meu-stream-dados`). 
* Configure o número de shards. Para iniciantes, 1 shard é suficiente. 
* Clique em "Create Kinesis stream".

2. **Configurar Permissões do IAM:** 
* Acesse o console do AWS IAM. * Crie uma nova role com permissões para Kinesis. 
* Anexe a política gerenciada `AmazonKinesisFullAccess` à role. 

#### Passo 2: Coletar Dados com o Amazon Kinesis 

3. **Produzir Dados para o Stream do Kinesis:** 
* Você pode usar a AWS SDK para enviar dados para o stream. Aqui está um exemplo em Python:  
```python 
import boto3
import json 

kinesis_client = boto3.client('kinesis', region_name='us-east-1') 

def send_data(): 
    for i in range(100): 
        data = { 
            'id': i, 
            'message': f'Test message {i}' 
        } 
        kinesis_client.put_record( 
            StreamName='meu-stream-dados', 
            Data=json.dumps(data), PartitionKey=str(i)
        ) 

send_data()
``` 

#### Passo 3: Processar Dados com o Amazon Kinesis 

4. **Criar uma Aplicação Kinesis Data Analytics:** 
* Acesse o console do Amazon Kinesis e selecione "Kinesis Data Analytics". 
* Clique em "Create application". * Insira um nome para a aplicação (ex: `minha-aplicacao-analytics`). 
* Selecione "SQL" como o modo de processamento de dados. 
* Clique em "Create application". 

5. **Configurar a Aplicação de Analytics:** 
* Dentro da aplicação criada, clique em "Connect to a source". 
* Selecione "Kinesis stream" e escolha o stream criado anteriormente. 
* Clique em "Discover schema" para detectar automaticamente o esquema dos dados. 

6. **Escrever a Consulta SQL:** 
* Use a seguinte consulta SQL como exemplo para processar os dados:   
```sql 
CREATE OR REPLACE STREAM "OUTPUT_STREAM" 
    ( id INTEGER,
     message VARCHAR(100) );
CREATE OR REPLACE PUMP "STREAM_PUMP"
     AS INSERT INTO "OUTPUT_STREAM" 
     SELECT STREAM id, message
     FROM "SOURCE_SQL_STREAM_001";
```
 
 7. **Iniciar a Aplicação de Analytics:** 
 * Após configurar a consulta SQL, clique em "Run application" para iniciar o processamento de dados em tempo real. 
 
 #### Passo 4: Consumir Dados Processados 
 
 8. **Consumir Dados do Stream Processado:** 
 * Use a AWS SDK para consumir dados do stream de saída. Aqui está um exemplo em Python: 
 ```python
 import boto3 
 kinesis_client = boto3.client('kinesis', region_name='us-east-1') 
 def get_data(): 
    shard_id = 'shardId-000000000000' 
    shard_iterator = kinesis_client.get_shard_iterator (                        
        StreamName='meu-stream-dados',
        ShardId=shard_id,     
        ShardIteratorType='LATEST' 
    )['ShardIterator'] 
    
    while True: record_response = kinesis_client.get_records(              
            ShardIterator=shard_iterator,
            Limit=10 
        ) 
        records = record_response['Records'] 
            for record in records: 
                data = json.loads(record['Data']) 
                print(data) s
                hard_iterator = record_response['NextShardIterator'] 
        
    get_data()
 ```


