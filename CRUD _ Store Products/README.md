```

POST /registration
{ "email":"test@test.com", "password":"test5A!", "passwordRepeat":"test5A!" }

POST /login
{ "email":"test@test.com", "password":"test5A!" }

GET /logout
['Authorization': 'Bearer user-token']

GET /profile
['Authorization': 'Bearer user-token']


POST /categories
{ "name":"test" }
['Authorization': 'Bearer user-token']

GET /categories
['Authorization': 'Bearer user-token']

GET /categories/:id
/category-id
['Authorization': 'Bearer user-token']

PUT /categories/:id
/category-id
{ "name":"test" }
['Authorization': 'Bearer user-token']

DELETE /categories/:id 
/category-id
['Authorization': 'Bearer user-token']


POST /products
{ "name":"test", "price":5, "categoryId":1 }
['Authorization': 'Bearer user-token']

GET /products
['Authorization': 'Bearer user-token']

PUT /products/:id
/product-id
{ "name":"test", "price":5, "categoryId":1 }
['Authorization': 'Bearer user-token']

GET /products/:id
/product-id
['Authorization': 'Bearer user-token']

DELETE /products/:id
/product-id
['Authorization': 'Bearer user-token']

```

```
/product-id
['Authorization': 'Bearer user-token']
```