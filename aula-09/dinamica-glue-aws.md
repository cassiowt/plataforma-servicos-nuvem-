### Tutorial: Realizar uma Carga ETL de um Arquivo CSV com Amazon Glue
 Amazon Glue é um serviço de ETL (Extract, Transform, Load) totalmente gerenciado que facilita a preparação e carregamento de dados para análise. Neste tutorial, vamos demonstrar como realizar uma carga ETL de um arquivo CSV utilizando Amazon Glue. 

#### Pré-requisitos: 
1. Conta na AWS. 
2. Permissões necessárias para acessar Amazon S3 e Glue. 
3. Arquivo CSV armazenado em um bucket do Amazon S3. 

#### Passo 1: Configuração do Ambiente 
1. **Crie um Bucket no Amazon S3:** 
* Acesse o console do Amazon S3. 
* Crie um bucket e faça o upload do arquivo CSV que será utilizado para o processo ETL. 
2. **Crie um Role para o Glue:** * Acesse o console do IAM (Identity and Access Management). 
* Crie uma nova role com as permissões necessárias para acessar S3 e Glue. 
* Anexe a política `AmazonS3FullAccess` e `AWSGlueServiceRole` à role.

 #### Passo 2: Configuração do Glue 
 1. **Criação do Crawler:** 
 * Acesse o console do Amazon Glue. * Vá para a seção "Crawlers" e clique em "Add crawler". 
 * Configure o nome do crawler e a role criada anteriormente.
 * Adicione um caminho de dados apontando para o bucket S3 onde o arquivo CSV está armazenado. 
 * Configure a criação de uma tabela em um database Glue. 
 2. **Executar o Crawler:** 
 * Após a configuração, execute o crawler. 
 * O crawler irá identificar os esquemas dos dados no arquivo CSV e criar uma tabela de metadados no Glue Data Catalog.
 
#### Passo 3: Configuração do Job ETL 
1. **Criar um Job ETL:** 
* Vá para a seção "Jobs" no console do Glue. 
* Clique em "Add job". 
* Configure o nome do job e a role. 
* Defina o tipo de script como "Spark" e selecione "Python" como linguagem. 
2. **Escrever o Script ETL:** 
* Utilize o editor de script para escrever o código ETL. Abaixo está um exemplo de script para carregar os dados do arquivo CSV, transformá-los e salvá-los de volta no S3. 

```python
import sys from awsglue.transforms 
import * from awsglue.utils 
import getResolvedOptions from pyspark.context 
import SparkContext from awsglue.context 
import GlueContext from awsglue.job 
import Job 

args = getResolvedOptions(sys.argv, ['JOB_NAME']) 
sc = SparkContext() 
glueContext = GlueContext(sc) 
spark = glueContext.spark_session 
job = Job(glueContext) job.init(args['JOB_NAME'], args) 

# Criação do DynamicFrame a partir da tabela criada pelo Crawler 
datasource0 = glueContext.create_dynamic_frame.from_catalog(database = "nome_do_database", table_name = "nome_da_tabela", transformation_ctx = "datasource0")
# Aplicar transformações (exemplo: converter para Parquet)
applymapping1 = ApplyMapping.apply(frame = datasource0, mappings = [("coluna1", "string", "coluna1", "string"), ("coluna2", "string", "coluna2", "string")], transformation_ctx = "applymapping1") 
# Escrever de volta no S3
datasink2 = glueContext.write_dynamic_frame.from_options(frame = applymapping1, connection_type = "s3", connection_options = {"path": "s3://bucket-de-destino"}, format = "parquet", transformation_ctx = "datasink2") job.commit()
``` 
3. **Configurar o Job:** 
* No console do Glue, configure os detalhes do job, como o bucket de destino, tipo de instância e parâmetros do job. 
* Salve as configurações e execute o job. 

#### Passo 4: Executar e Monitorar o Job 
1. **Executar o Job:** 
* No console do Glue, inicie o job. 
* Acompanhe a execução na seção "Runs" do job para monitorar o progresso e verificar logs. 
2. **Verificar os Resultados:** 
* Após a conclusão do job, verifique o bucket S3 de destino para confirmar que os dados transformados foram carregados com sucesso.”



