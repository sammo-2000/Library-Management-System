# API Endpoint Template

**Endpoint**:
GET /api/media/

**Description**: Get all media matching query parameters

**Headers**:

- `Authorization`: Bearer [token] (required)

**Query Parameters**:

- `title` (type: string, optional): Title or section of title of the piece/pieces of media.
- `type` (type: string, optional): The type of media (e.g. Book).
- `genreId` (type: integer, optional): The ID of the genre.
- `authorId` (type: integer, optional): The ID of the author.
- `branchId` (type: integer, optional): The ID of the library branch.
- `cityId` (type: integer, optional): The ID of the city (ignored if `branchId` is provided).
- `page` (type: integer, optional): The page number to offset results for pagination, defaults to 1.

---

This example shows a `GET` request for all media from branch with ID 1.

**_Response_**:

- Status: 200 Ok
- Body:

```json
{
  "media": [
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
      "Publisher": {
        "id": 1,
        "name": "Penguin Books"
      },
      "Genre": {
        "id": 1,
        "genre": "Fiction"
      }
    },
    {
      "id": 2,
      "type": "Book",
      "title": "Adventures of Huckleberry Finn",
      "description": "A novel by Mark Twain",
      "publishedDate": "1884-12-10",
      "Author": {
        "id": 2,
        "name": "Mark Twain"
      },
      "Publisher": {
        "id": 2,
        "name": "HarperCollins"
      },
      "Genre": {
        "id": 6,
        "genre": "Adventure"
      }
    },
    {
      "id": 3,
      "type": "Book",
      "title": "Great Expectations",
      "description": "A novel by Charles Dickens",
      "publishedDate": "1861-08-01",
      "Author": {
        "id": 3,
        "name": "Charles Dickens"
      },
      "Publisher": {
        "id": 3,
        "name": "Random House"
      },
      "Genre": {
        "id": 1,
        "genre": "Fiction"
      }
    }
  ],
  "total": 3
}
```

---

This example shows a `GET` request for all media from branch with ID "Hallam".

**_Response_**:

- Status: 500 Internal Server Error
- Body:

```json
{
  "message": "invalid input syntax for type integer: \"Hallam\""
}
```
