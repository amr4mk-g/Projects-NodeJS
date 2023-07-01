## POST /users/signup
```
{ "name":"test", "age":1, "email":"test@test.com", "password":"test5A!" }
```

## POST /users/login
```
{ "email":"test@test.com", "password":"test5A!" }
```

## POST /users/logout
```
['Authorization': 'Bearer user-token']
```

## POST /users/logoutAll
```
['Authorization': 'Bearer user-token']
```

## GET /users/me
```
['Authorization': 'Bearer user-token']
```

## GET /users/:id/avatar
```
/user-id
['Authorization': 'Bearer user-token']
```

## POST /users/me/avatar
```
file upload : image
['Authorization': 'Bearer user-token']
```

## DELETE /users/me/avatar
```
['Authorization': 'Bearer user-token']
```

## POST /tasks
```
{ "description":"test", "completed":false }
['Authorization': 'Bearer user-token']
```

## GET /tasks
```
?matched=x&limit=n&skip=n&sortBy=x
['Authorization': 'Bearer user-token']
```

## GET /tasks/:id
```
/task-id
['Authorization': 'Bearer user-token']
```

## PATCH /tasks/:id
```
/task-id
{ "description":"test", "completed":false }
['Authorization': 'Bearer user-token']
```

## DELETE /tasks/:id 
```
/task-id
['Authorization': 'Bearer user-token']
```