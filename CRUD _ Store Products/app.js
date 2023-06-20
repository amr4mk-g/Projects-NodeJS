const express = require('express');
const controller = require('./controllers/productController');

const app = express();
app.use(express.json());

app.get(['/', '/products'], controller.getAllProducts);
app.get('/products/:id', controller.validateID, controller.getProduct);
app.post('/products', controller.validateData, controller.createProduct);     
app.put('/products/:id', [controller.validateID, controller.validateData], controller.updateProduct);  
app.delete('/products/:id', controller.validateID, controller.deleteProduct);
app.use(controller.notFound);
  
const port = 3000;
app.listen(port, ()=>{
  console.log(`Server running on: http://localhost:${port}`);
});