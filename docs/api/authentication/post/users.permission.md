## Example API Endpoint

This example shows a `POST` endpoint for logging users into the system.  

**Endpoint**: POST /api/users-permission  
**Description**: sign a user into the system

**Headers**:
- `Authorization`: JWT Bearer

**Request Body** (for `POST` requests):
```json
{
    "service": "authentication",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzMyODI4NDMwLCJleHAiOjE3MzI4MzIwMzB9.PxV4PKbnoPtU6j3BHSvDBuLickYDJ_DkMTHhpN-uKuU"
}


```
**Request Body**:

```json
{
    "service": "authentication",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzMyODI4NDMwLCJleHAiOjE3MzI4MzIwMzB9.PxV4PKbnoPtU6j3BHSvDBuLickYDJ_DkMTHhpN-uKuU"
}
```

***Response***:

- Status: 200 ok
- Body:
```json
{
    "userId": 1,
    "permission": {
        "forMe": {
            "create": false,
            "read": true,
            "update": true,
            "delete": true
        },
        "forOthers": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        }
    }
}

Fail Response:
Status: 401 unauthorized
{
    "error": "Invalid or expired token"
}

Status: 404 Not Found
{
    "error": "Permissions for service \"authenticatio\" not found"
}
```
---

