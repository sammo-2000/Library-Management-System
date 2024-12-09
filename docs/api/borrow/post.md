# API Endpoint Template

**Endpoint**:
POST /api/borrowing

**Description**: Create a new borrow.

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

This example shows a `POST` endpoint for creating a borrow.

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
    "id": "0508f4c1-4ba9-48c3-b877-3944aaa30031",
    "mediaId": "1",
    "accountId": "1",
    "branchId": "1",
    "collectedAt": "2024-12-09T12:28:28.207Z",
    "expectedReturn": "2024-12-23T12:28:28.203Z",
    "actualReturn": null,
    "createdAt": "2024-12-09T12:28:28.207Z",
    "updatedAt": "2024-12-09T12:28:28.207Z"
}
```