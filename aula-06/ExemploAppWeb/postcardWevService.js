const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


exports.handler  = async (event, context, callback) => {
  const postcardsPath = './postcards.json';
  
  // Rota GET para obter todos os Postcards
  if (event.httpMethod === 'GET' && event.path === '/postcards') {
    try {
      const data = fs.readFileSync(postcardsPath, 'utf8');
      const postcards = JSON.parse(data);
      return {
        statusCode: 200,
        body: JSON.stringify(postcards),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to read postcards data.' }),
      };
    }
  }

  // Rota GET para obter um único Postcard pelo ID
  if (event.httpMethod === 'GET' && event.path === '/postcards/') {
    const postId = event.pathParameters.id;

    try {
      const data = fs.readFileSync(postcardsPath, 'utf8');
      const postcards = JSON.parse(data);
      const postcard = postcards.find((post) => post.id === postId);

      if (!postcard) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Postcard not found.' }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(postcard),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to read postcards data.' }),
      };
    }
  }

  // Rota POST para adicionar um novo Postcard
  if (event.httpMethod === 'POST' && event.path === '/postcards') {
    const { name, cidade, pais, descricao, imageUrl } = JSON.parse(event.body);

    const newPostcard = {
      id: uuidv4(),
      name,
      cidade,
      pais,
      descricao,
      imageUrl,
    };

    try {
      fs.readFile(postcardsPath, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return {
              statusCode: 500,
              body: 'Failed to read postcards data.' 
              }
            }
          const postcards = JSON.parse(data);
          postcards.push(newPostcard);
          fs.writeFileSync(postcardsPath, JSON.stringify(postcards, null, 2));
      });
      return {
        statusCode: 201,
        body: JSON.stringify(newPostcard),
      };
    }
     catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to add new postcard.' }),
      };
    }
  }

  // Rota PUT para atualizar um Postcard pelo ID
  if (event.httpMethod === 'PUT' && event.path.startsWith('/postcards/')) {
    const postId = event.pathParameters.id;
    const { name, cidade, pais, descricao, imageUrl } = JSON.parse(event.body);

    try {
      const data = fs.readFileSync(postcardsPath, 'utf8');
      const postcards = JSON.parse(data);
      const postcard = postcards.find((item) => item.id === postId);

      if (!postcard) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Postcard not found.' }),
        };
      }

      postcard.name = name;
      postcard.cidade = cidade;
      postcard.pais = pais;
      postcard.descricao = descricao;
      postcard.imageUrl = imageUrl;

      fs.writeFileSync(postcardsPath, JSON.stringify(postcards, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify(postcard),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update postcard.' }),
      };
    }
  }

  // Rota DELETE para excluir um Postcard pelo ID
  if (event.httpMethod === 'DELETE' && event.path.startsWith('/postcards/')) {
    const postId = event.pathParameters.id;

    try {
      const data = fs.readFileSync(postcardsPath, 'utf8');
      let postcards = JSON.parse(data);
      const postcardIndex = postcards.findIndex((item) => item.id === postId);

      if (postcardIndex === -1) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Postcard not found.' }),
        };
      }

      postcards = postcards.filter((item) => item.id !== postId);

      fs.writeFileSync(postcardsPath, JSON.stringify(postcards, null, 2));

      return {
        statusCode: 204,
        body: '',
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete postcard.' }),
      };
    }
  }
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'Rota inexistente.' + event.p  }),
  };
};  




