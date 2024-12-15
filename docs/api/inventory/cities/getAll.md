# API Endpoint Template

**Endpoint**:
GET /api/cities/

**Description**: Gets all the cities.

**Headers**:

- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` request for all cities.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "city": "Sheffield"
  },
  {
    "id": 2,
    "city": "London"
  },
  {
    "id": 3,
    "city": "Bristol"
  },
  {
    "id": 4,
    "city": "Manchester"
  },
  {
    "id": 5,
    "city": "Edinburgh"
  }
]
```
