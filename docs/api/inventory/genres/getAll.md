# API Endpoint Template

**Endpoint**:
GET /api/genres/

**Description**: Gets all the genres.

**Headers**:

- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` request for all genres.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "genre": "Fiction"
  },
  {
    "id": 2,
    "genre": "Science Fiction"
  },
  {
    "id": 3,
    "genre": "Biography"
  },
  {
    "id": 4,
    "genre": "Historical Fiction"
  },
  {
    "id": 5,
    "genre": "Dystopian"
  },
  {
    "id": 6,
    "genre": "Adventure"
  },
  {
    "id": 7,
    "genre": "Classic"
  }
]
```
