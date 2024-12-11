## Example API Endpoint

This example shows a `POST` endpoint for logging users into the system.  

**Endpoint**: POST /api/signin  
**Description**: sign a user into the system

**Headers**:
- `Authorization`: JWT Bearer

**Request Body** (for `POST` requests):
```json
{
   "email": "example@gmail.com",
   "password": "password" 
}


```
**Request Body**:

```json
{
  
   "email": "example@gmail.com",
   "password": "password" 
}
```

***Response***:

- Status: 200 ok
- Body:
```json

 {
    "message": "Sign-in successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzMzNzQ5MjYyLCJleHAiOjE3MzM3NTI4NjJ9.P3d-fdchHhrZKlQuX4ka7iif2-kpgjvMS2q_XkJE0vk"
 }


Fail Response:
Status: 401 unauthorized
{
    "error": "Invalid email or password"
}
```
---

