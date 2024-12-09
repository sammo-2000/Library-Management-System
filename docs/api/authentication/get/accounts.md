
---
## Example API Endpoint

This example shows a `GET` endpoint for retrieve all account in the system  

**Endpoint**: GET /api/accounts?accountId=&firstName=&lastName=&email=

**Description**: retrieve all or specific user accounts available in the database, this endpoint can only be access by a user with the role 'manager'.

**Headers**:

- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json


***Response***:

- Status: 200 ok
- Body:
```json
    {
        "id": 1,
        "username": "user1",
        "password": "$2a$10$ORjad34EdxNd8jIZF1VU1.JwtZtuT8Uc8V/QmB0ZHvqagMFuByOBa",
        "user_role": "manager",
        "first_name": "john",
        "last_name": "doe",
        "email": "manager@gmail.com",
        "created_at": "2024-12-09T17:19:16.097Z"
    }

Fail Response:
Status: 403 forbidden
{
    "error": "Token is invalid or expired"
}

Status: 403 forbidden
{
    "error": "Access forbidden: Requires one of the roles: manager"
}
```
---