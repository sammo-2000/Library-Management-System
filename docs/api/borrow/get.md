# API Endpoint Template

**Endpoint**:
GET /api/borrowing/:id

**Description**: Get single borrowing by ID.

**Headers**:
- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` endpoint for single borrow with ID of 1.

***Response***:

- Status: 200 Ok
- Body:

```json
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
```