const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const userController = require('./controllers/userController')
const orderController = require('./controllers/orderController')
const orderProductController = require('./controllers/orderProductController')

const path = '/api/v1'
app.get(`${path}/users`, userController.findAll);

app.get(`${path}/orders`, orderController.all);
app.post(`${path}/orders`, orderController.create);
app.put(`${path}/orders/:id`, orderController.update);
app.delete(`${path}/orders/:id`, orderController.delete);

app.get(`${path}/products`, orderProductController.all);
app.post(`${path}/products`, orderProductController.create);
app.put(`${path}/products/:id`, orderProductController.update);
app.delete(`${path}/products/:id`, orderProductController.delete);


app.listen(8080, () => {
    console.log('Server listening on port 8080.');
});
