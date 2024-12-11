# API Endpoint Template

**Endpoint**:
GET /api/stocks

**Description**: Get all stocks count for all branches.

---

This example shows a `GET` endpoint for getting all stocks count.

***Response***:

- Status: 200 Ok
- Body:

```json
[
    {
        "quantity": 5,
        "BranchId": 1,
        "MediaId": 1
    }
]
```