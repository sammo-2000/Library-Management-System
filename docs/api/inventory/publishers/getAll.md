# API Endpoint Template

**Endpoint**:
GET /api/publishers/

**Description**: Gets all the publishers.

**Headers**:

- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` request for all publishers.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "name": "Penguin Books"
  },
  {
    "id": 2,
    "name": "HarperCollins"
  },
  {
    "id": 3,
    "name": "Random House"
  },
  {
    "id": 4,
    "name": "Simon & Schuster"
  },
  {
    "id": 5,
    "name": "Vintage Books"
  }
]
```
