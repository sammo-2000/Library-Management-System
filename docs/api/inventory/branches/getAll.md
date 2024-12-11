# API Endpoint Template

**Endpoint**:
GET /api/branches/

**Description**: Gets all the branches.

**Headers**:

- `Authorization`: Bearer [token] (required)

---

This example shows a `GET` request for all branches.

**_Response_**:

- Status: 200 Ok
- Body:

```json
[
  {
    "id": 1,
    "name": "Hallam",
    "City": {
      "id": 1,
      "city": "Sheffield"
    }
  },
  {
    "id": 2,
    "name": "Central Library",
    "City": {
      "id": 1,
      "city": "Sheffield"
    }
  },
  {
    "id": 3,
    "name": "Camden",
    "City": {
      "id": 2,
      "city": "London"
    }
  },
  {
    "id": 4,
    "name": "Kensington",
    "City": {
      "id": 2,
      "city": "London"
    }
  },
  {
    "id": 5,
    "name": "Westminster",
    "City": {
      "id": 2,
      "city": "London"
    }
  },
  {
    "id": 6,
    "name": "Avonmouth",
    "City": {
      "id": 3,
      "city": "Bristol"
    }
  },
  {
    "id": 7,
    "name": "Redland",
    "City": {
      "id": 3,
      "city": "Bristol"
    }
  },
  {
    "id": 8,
    "name": "Northern Quarter",
    "City": {
      "id": 4,
      "city": "Manchester"
    }
  },
  {
    "id": 9,
    "name": "Didsbury",
    "City": {
      "id": 4,
      "city": "Manchester"
    }
  },
  {
    "id": 10,
    "name": "Leith",
    "City": {
      "id": 5,
      "city": "Edinburgh"
    }
  },
  {
    "id": 11,
    "name": "Morningside",
    "City": {
      "id": 5,
      "city": "Edinburgh"
    }
  }
]
```
