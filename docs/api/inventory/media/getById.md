# API Endpoint Template

**Endpoint**:
GET /api/media/:id

**Description**: Get the piece of media with the given ID.

**Headers**:

- `Authorization`: Bearer [token] (required)

**Path Variables**

- `id` (type: integer, required): ID of the desired piece of media.

---

This example shows a `GET` request for media with ID 1.

**_Response_**:

- Status: 200 Ok
- Body:

```json
{
  "id": 1,
  "type": "Book",
  "title": "Pride and Prejudice",
  "description": "A classic novel by Jane Austen",
  "publishedDate": "1813-01-28",
  "Author": {
    "id": 1,
    "name": "Jane Austen"
  },
  "Genre": {
    "id": 1,
    "genre": "Fiction"
  },
  "Publisher": {
    "id": 1,
    "name": "Penguin Books"
  }
}
```

---

This example shows a `GET` request for media with ID "Great Expectations".

**_Response_**:

- Status: 400 Bad Request
- Body:

```json
{
  "message": "Media ID should be a number"
}
```
