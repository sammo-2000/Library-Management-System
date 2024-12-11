
---
## Example API Endpoint

This example shows a `GET` endpoint for logging users into the system.  

**Endpoint**: GET /api/userId  
**Description**: retrieve user's id

**Headers**:

- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json


***Response***:

- Status: 200 ok
- Body:
```json
{
    "id": 109876543,
    "role": "manager"
}

Fail Response:
Status: 403 forbidden
{
    "error": "Token is invalid or expired"
}
```
---