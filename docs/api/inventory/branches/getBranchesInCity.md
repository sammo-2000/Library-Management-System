# API Endpoint Template

**Endpoint**:
GET /api/branches/city/:id

**Description**: Gets all the branches in the city with the given id.

**Headers**:

- `Authorization`: Bearer [token] (required)

**Path Variables**

- `id` (type: integer, required): ID of the city you wish to get the branches for.

---

This example shows a `GET` request for all the branches in the city with id 1.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "name": "Hallam"
  },
  {
    "id": 2,
    "name": "Central Library"
  }
]
```

---

This example shows a `GET` request for all the branches in city with id 999 (doesn't exist).

**_Response_**:

- Status: 200 Ok
- Body:

```json
[]
```

---

This example shows a `GET` request for all the branches in the city with id "Sheffield".

**_Response_**:

- Status: 400 Bad Request
- Body:

```json
{
  "message": "City ID should be a number"
}
```
