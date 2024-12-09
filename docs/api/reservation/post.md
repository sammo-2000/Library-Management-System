# API Endpoint Template

**Endpoint**:
POST /api/reservation

**Description**: Create a new reservation.

**Headers**:
- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json

**Request Body** (for `POST` requests):

```json
{
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1"
}
```

---

This example shows a `POST` endpoint for creating a reservation.

**Request Body**:

```json
{
  "mediaId": "1",
  "accountId": "1",
  "branchId": "1"
}
```

***Response***:

- Status: 201 Created
- Body:

```json
{
    "id": "f93afa76-a49e-4faa-acde-64b0383e9132",
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1",
    "notificationSent": null,
    "reservedAt": "2024-12-09T12:43:27.369Z",
    "collectedAt": null,
    "createdAt": "2024-12-09T12:43:27.369Z",
    "updatedAt": "2024-12-09T12:43:27.369Z"
}
```

***No All Required Field Submitted***

- Status: 400 Bad Request
- Body:

```json
{
    "message": [
        "branchId must be a string",
        "branchId should not be empty"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```