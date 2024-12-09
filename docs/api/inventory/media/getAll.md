# API Endpoint Template

**Endpoint**:
GET /api/media/

**Description**: Get all media matching query parameters

**Headers**:

- `Authorization`: Bearer [token] (required)

**Query Parameters**:

- `title` (type: string, optional): Title or section of title of the piece/pieces of media.
- `type` (type: string, optional): The type of media (e.g. Book)
- `title` (type: string, optional): Title or section of title of the piece/pieces of media.

---

This example shows a `GET` endpoint for single borrow with ID of 1.

**_Response_**:

- Status: 200 Ok
- Body:

```json
{
  "id": "18ce2a87-7cef-4ac2-a333-72007a6a6b7f",
  "mediaId": "1",
  "accountId": "1",
  "branchId": "1",
  "collectedAt": "2024-12-09T12:15:12.979Z",
  "expectedReturn": "2024-12-23T12:15:12.977Z",
  "actualReturn": null,
  "createdAt": "2024-12-09T12:15:12.979Z",
  "updatedAt": "2024-12-09T12:15:12.979Z"
}
```
