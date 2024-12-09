# API Endpoint Template

**Endpoint**:
GET /api/borrowing

**Description**: Get all the borrowing.  

**Headers**:
- `Authorization`: Bearer [token] (required)


**Query Parameters**:
- `mediaId` (type: string, optional): To filter borrowing by media ID.
- `accountId` (type: string, optional): To filter borrowing by account ID.
- `branchId` (type: string, optional): To filter borrowing by branch ID.
- `returned` (type: boolean, optional): To filter borrowing by returned, not returned or all.
- `overdue` (type: boolean, optional): To filter borrowing by overdue, not overdue or all.

---

This example shows a `GET` endpoint for getting all borrow with media ID of 1.

**Query Parameters**:

- `mediaId` (type: string, optional): To filter borrowing by media ID.

***Response***:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": "18ce2a87-7cef-4ac2-a333-72007a6a6b7f",
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1",
    "collectedAt": "2024-12-09T12:15:12.979Z",
    "expectedReturn": "2024-12-23T12:15:12.977Z",
    "actualReturn": null,
    "createdAt": "2024-12-09T12:15:12.979Z",
    "updatedAt": "2024-12-09T12:15:12.979Z"
  }
]
```