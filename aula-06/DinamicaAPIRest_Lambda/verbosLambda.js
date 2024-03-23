
//get
export const handler = async (event) => {
    // Sua lógica para listar itens
    const response = {
        statusCode: 200,
        body: JSON.stringify('route GET!')
    };
    return response;
};

//post
export const handler = async (event, context) => {
  
    const length = event.length;
    const width = event.width;
    let area = calculateArea(length, width);
    console.log(`The area is ${area}`);
          
    console.log('CloudWatch log group: ', context.logGroupName);
    
    let data = {
      "area": area,
    };
      return JSON.stringify(data);
      
    function calculateArea(length, width) {
      return length * width;
    }
  };
  