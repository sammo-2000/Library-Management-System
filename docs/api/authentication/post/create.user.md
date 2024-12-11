

## Example API Endpoint

This example shows a `POST` endpoint for creating a new user in a system.  

**Endpoint**: POST /api/register  
**Description**: Creates a new user in the system.

**Headers**:

- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json

**Request Body** (for `POST` requests):
```json
{
  "first_name": "firstnameexample",
  "last_name": "lastnameExample",  
  "username": "exampleUser", 
  "email": "user@example.com", 
  "password": "securePassword123" 
}

This example shows a `POST` endpoint for creating a new user in a system.  

```
**Request Body**:

```json
{
  "first_name": "firstnameexample",
  "last_name": "lastnameExample",  
  "username": "exampleUser", 
  "email": "user@example.com", 
  "password": "securePassword123" 
}
```

***Response***:

- Status: 201 Created
- Body:
```json
{
  "type": "Success",
 "message" : "user registration successful"
}

Fail Response:
Status: 400 |
{
  "type": "Fail",
  "message": "user registration failed"
}
```
---