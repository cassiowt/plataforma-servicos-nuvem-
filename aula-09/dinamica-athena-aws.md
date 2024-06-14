### Tutorial Detalhado para Uso do Amazon Athena 
#### 1\. Carregar Dados no S3 

Primeiro, vamos armazenar os dados no Amazon S3. Suponha que temos um arquivo CSV chamado `dados.csv` que queremos analisar. 

**Passo a Passo:** 

1. **Criar um Bucket no S3:** 
* Acesse o console do Amazon S3. 
* Clique em "Create bucket". 
* Dê um nome único ao bucket (ex: `meus-dados-bucket`). 
* Escolha a região desejada. 
* Mantenha as demais configurações padrão e clique em "Create bucket". 

2. **Carregar o Arquivo CSV:** 
* Acesse o bucket recém-criado. 
* Clique em "Upload". * Clique em "Add files" e selecione o arquivo `dados.csv`. 
* Clique em "Upload". 

#### 2\. Definir um Esquema 
Agora, vamos definir um esquema para os dados usando o console do Athena. 

**Passo a Passo:** 

1. **Acessar o Console do Athena:** 
* Acesse o console do Amazon Athena. 
* Se for a primeira vez, configure o local do resultado da consulta no S3: 
* Clique em "Settings" (ícone de engrenagem). 
* Em "Query result location", insira o caminho do bucket S3 onde deseja salvar os resultados das consultas (ex: `s3://meus-dados-bucket/athena-results/`).
* Clique em "Save". 


2. **Criar um Banco de Dados:** 
* No console do Athena, clique em "Query editor". 
* Execute a seguinte consulta para criar um banco de dados: sql Copy code `CREATE DATABASE meus_dados_db;` 

3. **Criar uma Tabela:** 
* Execute a seguinte consulta para criar uma tabela e definir o esquema: sql Copy code 
```sql
 CREATE EXTERNAL TABLE meus_dados_db.minha_tabela ( 
        coluna1 STRING, 
        coluna2 INT, 
        coluna3 DOUBLE 
    ) 
    ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.OpenCSVSerde' 
    WITH SERDEPROPERTIES (
         'separatorChar' = ',',
          'quoteChar' = '"' 
    )
    STORED AS TEXTFILE 
    LOCATION 's3://meus-dados-bucket/';
 ``` 

* Substitua `coluna1`, `coluna2`, `coluna3` pelos nomes e tipos das colunas no seu arquivo CSV.

#### 3\. Executar Consultas SQL 
Vamos executar algumas consultas SQL para analisar os dados.

**Passo a Passo:** 

1. **Executar uma Consulta:** 
* No console do Athena, no editor de consultas, execute uma consulta para verificar os dados: sql Copy code 
```sql
SELECT * FROM meus_dados_db.minha_tabela LIMIT 10;
``` 
2. **Exemplos de Consultas:** 
* **Contar o número de linhas na tabela:** 
```sql 
SELECT COUNT(*) FROM meus_dados_db.minha_tabela;
```
* **Filtrar dados baseados em uma condição:** 
```sql
SELECT * FROM meus_dados_db.minha_tabela WHERE coluna2 > 50;
``` 

3. **Usar a AWS CLI:**
* Você pode executar consultas Athena usando a AWS CLI. Primeiro, configure a AWS CLI com suas credenciais. 
* Execute o comando para iniciar uma consulta: 
```bash
aws athena start-query-execution \
    --query-string "SELECT * FROM meus_dados_db.minha_tabela LIMIT 10;" \
    --result-configuration "OutputLocation=s3://meus-dados-bucket/athena-results/"
```

#### 4\. Visualizar Resultados
Os resultados das consultas podem ser visualizados diretamente no console do Athena ou exportados para outras ferramentas de análise. 

**Passo a Passo:** 
1. **Visualizar no Console:** 
* Após executar uma consulta no console do Athena, os resultados serão exibidos na parte inferior da página. 
* Você pode visualizar, baixar ou salvar os resultados no S3.

2. **Exportar Resultados:** 
* Os resultados das consultas são automaticamente salvos no bucket S3 especificado. 
* Você pode acessar esses resultados diretamente no Amazon S3 e baixá-los para análise offline ou importar em ferramentas de BI.

#### 5\. Integração com Ferramentas de BI 
Ferramentas de BI como Amazon QuickSight, Tableau, Power BI, entre outras, podem ser integradas ao Amazon Athena para análises mais avançadas. 

**Integração com Amazon QuickSight:** 
1. **Configurar Conexão com Athena:** 
* No console do Amazon QuickSight, vá para "Manage data". 
* Clique em "New dataset" e selecione "Athena". 
* Configure a conexão com os detalhes do banco de dados e da tabela.

2. **Criar Dashboards e Relatórios:** 
* Após configurar a conexão, você pode criar visualizações interativas, dashboards e relatórios usando os dados do Athena.”



