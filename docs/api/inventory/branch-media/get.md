# API Endpoint Template

**Endpoint**:
GET /api/stocks/:branchId

**Description**: Get all stock quality + media detail for a branch.

---

This example shows a `GET` endpoint for getting all stock quality + media detail for a branch.

***Response***:

- Status: 200 Ok
- Body:

```json
[
  {
    "quantity": 5,
    "BranchId": 1,
    "MediaId": 1,
    "Medium": {
      "id": 1,
      "type": "Book",
      "title": "Pride and Prejudice",
      "description": "A classic novel by Jane Austen",
      "publishedDate": "1813-01-28",
      "createdAt": "2024-12-09T12:55:17.350Z",
      "updatedAt": "2024-12-09T12:55:17.350Z",
      "authorId": 1,
      "publisherId": 1,
      "genreId": 1
    }
  }
]
```

***Invalid Branch ID***

- Status: 200 Ok
- Body:

```json
[]
```