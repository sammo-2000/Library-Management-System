# API Endpoint Template

**Endpoint**:
GET /api/reservation

**Description**: Get all the reservation.  

**Headers**:
- `Authorization`: Bearer [token] (required)


**Query Parameters**:
- `mediaId` (type: string, optional): To filter reservation by media ID.
- `accountId` (type: string, optional): To filter reservation by account ID.
- `branchId` (type: string, optional): To filter reservation by branch ID.
- `notified` (type: boolean, optional): To filter reservation by notified, not notified or all.
- `collected` (type: boolean, optional): To filter reservation by collected, not collected or all.

---

This example shows a `GET` endpoint for getting all reservation with notification sent.

**Query Parameters**:

- `notified` (type: boolean, optional): To filter reservation by notified, not notified or all.

***Response***:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": "92c3bb0e-532f-4059-8168-69c7149701f6",
    "mediaId": "44",
    "accountId": "2",
    "branchId": "2",
    "notificationSent": "2024-11-14T15:04:05.678Z",
    "reservedAt": "2024-11-13T15:04:05.678Z",
    "collectedAt": "2024-11-14T15:04:05.678Z",
    "createdAt": "2024-11-12T23:22:55.608Z",
    "updatedAt": "2024-11-12T23:28:11.902Z"
  }
]
```