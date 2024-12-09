# API Endpoint Template

**Endpoint**:
PATCH /api/reservation

**Description**: Update a reservation.

**Headers**:
- `Authorization`: Bearer [token] (required)
- `Content-Type`: application/json

**Request Body** (for `PATCH` requests):

```json
{
    "notificationSent": true,
    "collected": true
}
```

---

This example shows a `PATCH` endpoint for updating a reservation after notifcation was sent.

**Request Body**:

```json
{
  "notificationSent": true
}
```

***Response***:

- Status: 201 Created
- Body:

```json
{
    "id": "18ce2a87-7cef-4ac2-a333-72007a6a6b7f",
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1",
    "collectedAt": "2024-12-09T12:15:12.979Z",
    "expectedReturn": "2024-12-23T12:15:12.977Z",
    "actualReturn": "2024-12-09T12:30:01.022Z",
    "createdAt": "2024-12-09T12:15:12.979Z",
    "updatedAt": "2024-12-09T12:30:01.023Z"
}
```

***No Found By Given ID***

- Status: 400 Bad Request
- Body:

```json
{
    "message": "Reservation not found",
    "error": "Not Found",
    "statusCode": 404
}
```