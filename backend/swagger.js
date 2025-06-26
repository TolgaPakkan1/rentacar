// backend/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rent A Car API',
      version: '1.0.0',
      description: 'Kullanıcı ve admin işlemleri için API dökümantasyonu',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger açıklamalarının bulunduğu yer
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
