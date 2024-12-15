# API Endpoint Template

**Endpoint**:
GET /api/branches/:id

**Description**: Gets the branch with the given id.

**Headers**:

- `Authorization`: Bearer [token] (required)

**Path Variables**

- `id` (type: integer, required): ID of the desired branch.

---

This example shows a `GET` request for the branch with id 1.

**_Response_**:

- Status: 200 Ok
- Body:

```json
{
  "id": 1,
  "name": "Hallam",
  "City": {
    "id": 1,
    "city": "Sheffield"
  }
}
```

---

This example shows a `GET` request for the branch with id "Hallam".

**_Response_**:

- Status: 400 Bad Request
- Body:

```json
{
  "message": "Branch ID should be a number"
}
```

---

This example shows a `GET` request for the branch with id 999 (doesn't exist).

**_Response_**:

- Status: 404 Not Found
- Body:

```json
{
  "message": "Branch not found"
}
```
