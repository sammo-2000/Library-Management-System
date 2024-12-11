# API Endpoint Template

**Endpoint**:
GET /api/authors/

**Description**: Gets all the authors.

**Headers**:

- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` request for all authors.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "name": "Jane Austen"
  },
  {
    "id": 2,
    "name": "Mark Twain"
  },
  {
    "id": 3,
    "name": "Charles Dickens"
  },
  {
    "id": 4,
    "name": "Harper Lee"
  },
  {
    "id": 5,
    "name": "George Orwell"
  },
  {
    "id": 6,
    "name": "Herman Melville"
  },
  {
    "id": 7,
    "name": "Leo Tolstoy"
  },
  {
    "id": 8,
    "name": "F. Scott Fitzgerald"
  },
  {
    "id": 9,
    "name": "Aldous Huxley"
  },
  {
    "id": 10,
    "name": "J.D. Salinger"
  }
]
```
