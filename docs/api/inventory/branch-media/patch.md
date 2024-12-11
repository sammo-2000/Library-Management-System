# API Endpoint Template

**Endpoint**:
PATCH /api/stocks/update/:branchId

**Description**: reduce the stock quantity by 1 after media reservation

---

This example shows a `PATCH` endpoint for update (reduce) the stock quantity  of a reserved media.


**Request Body** (for `PATCH` requests):
```json
{
   "MediaId": 1
}
```

***Response***:

- Status: 200 ok
- Body:
```json

 {
    "quantity": 2,
    "BranchId": 2,
    "MediaId": 1
 }

 Fail Response:
 Status: 400 Bad request
{
   "message": "Invalid request payload"
}
```


