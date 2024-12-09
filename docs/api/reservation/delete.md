# API Endpoint Template

**Endpoint**:
DELETE /api/reservation/:id

**Description**: Delete single reservation by ID.

**Headers**:
- `Authorization`: Bearer [token] (required)

---

This example shows a `DELETE` endpoint for single reservation with ID of 1.

***Response***:

- Status: 200 Ok
- Body:

```json
{
    "id": "f8095f48-9fa7-4ba1-b83b-e7d9861d0ed3",
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1",
    "notificationSent": "2024-11-14T09:16:06.023Z",
    "reservedAt": "2024-11-14T09:15:47.086Z",
    "collectedAt": "2024-11-14T09:16:28.319Z",
    "createdAt": "2024-11-14T09:15:47.086Z",
    "updatedAt": "2024-11-14T09:16:28.320Z"
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